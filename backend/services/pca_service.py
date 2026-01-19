import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans

class MusicPCA:
    def __init__(self, n_components=3):
        self.scaler = StandardScaler()
        self.pca = PCA(n_components=n_components)
        self.kmeans = KMeans(n_clusters=5, random_state=42)
        self.features = ['danceability', 'energy', 'loudness', 'speechiness', 'acousticness', 
                         'instrumentalness', 'liveness', 'valence', 'tempo']

    def process_data(self, df):
        # Filter only numeric columns that exist in the features list
        available_features = [f for f in self.features if f in df.columns]
        
        if not available_features:
            raise ValueError("No audio features found in dataset")

        X = df[available_features]
        
        # Standardize
        X_scaled = self.scaler.fit_transform(X)
        
        # PCA
        coords = self.pca.fit_transform(X_scaled)
        
        # Clustering
        clusters = self.kmeans.fit_predict(coords)
        
        # Add results to dataframe
        result_df = df.copy()
        result_df['x'] = coords[:, 0]
        result_df['y'] = coords[:, 1]
        result_df['z'] = coords[:, 2]  # 3rd dimension
        result_df['cluster'] = clusters
        
        # Explained Variance
        explained_variance = self.pca.explained_variance_ratio_.tolist()
        
        # Components (Loadings) for Explainability
        # rows: components, cols: features
        loadings = pd.DataFrame(
            self.pca.components_.T, 
            columns=['PC1', 'PC2', 'PC3'], 
            index=available_features
        )
        
        # Calculate distance to center (0,0,0 in PCA space)
        centroid = np.mean(coords, axis=0)
        
        return {
            'data': result_df.to_dict(orient='records'),
            'explained_variance': explained_variance,
            'loadings': loadings.reset_index().to_dict(orient='records'),
            'centroid': centroid.tolist()
        }

    def recommend(self, df, target_id=None, coordinates=None, n_recommendations=5):
        # Simple Euclidean distance in 3D PCA space
        if target_id is not None:
            target = df[df['id'] == target_id]
            if target.empty:
                return []
            # Check if z exists, if not re-process might be needed, but assuming data is consistent
            if 'z' not in target.columns:
                 return []
            target_coords = target[['x', 'y', 'z']].values[0]
        elif coordinates is not None:
             target_coords = np.array(coordinates)
        else:
            return []
            
        # Calculate 3D distances
        df['distance'] = np.sqrt(
            (df['x'] - target_coords[0])**2 + 
            (df['y'] - target_coords[1])**2 +
            (df['z'] - target_coords[2])**2
        )
        
        # Sort and exclude self (if target_id provided)
        if target_id is not None:
            recs = df[df['id'] != target_id].sort_values('distance').head(n_recommendations)
        else:
            recs = df.sort_values('distance').head(n_recommendations)
            
        return recs.to_dict(orient='records')

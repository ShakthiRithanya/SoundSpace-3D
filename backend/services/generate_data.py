import pandas as pd
import numpy as np

def generate_sample_data(num_songs=200):
    genres = ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic', 'Metal', 'Country']
    
    data = []
    
    for i in range(num_songs):
        genre = np.random.choice(genres)
        
        # Base features based on genre (simplified logic for clustering effect)
        if genre == 'Pop':
            danceability = np.random.uniform(0.6, 0.9)
            energy = np.random.uniform(0.6, 0.9)
            acousticness = np.random.uniform(0.0, 0.4)
            valence = np.random.uniform(0.5, 0.9)
        elif genre == 'Rock':
            danceability = np.random.uniform(0.3, 0.6)
            energy = np.random.uniform(0.7, 1.0)
            acousticness = np.random.uniform(0.0, 0.3)
            valence = np.random.uniform(0.3, 0.7)
        elif genre == 'Jazz':
            danceability = np.random.uniform(0.4, 0.7)
            energy = np.random.uniform(0.2, 0.5)
            acousticness = np.random.uniform(0.6, 0.9)
            valence = np.random.uniform(0.4, 0.8)
        elif genre == 'Classical':
            danceability = np.random.uniform(0.1, 0.4)
            energy = np.random.uniform(0.0, 0.3)
            acousticness = np.random.uniform(0.8, 1.0)
            valence = np.random.uniform(0.0, 0.3)
        elif genre == 'Electronic':
            danceability = np.random.uniform(0.7, 1.0)
            energy = np.random.uniform(0.8, 1.0)
            acousticness = np.random.uniform(0.0, 0.2)
            valence = np.random.uniform(0.6, 1.0)
        else:
            danceability = np.random.uniform(0.3, 0.8)
            energy = np.random.uniform(0.3, 0.8)
            acousticness = np.random.uniform(0.1, 0.8)
            valence = np.random.uniform(0.2, 0.8)
            
        song = {
            'id': i,
            'name': f'Song {i}',
            'artist': f'Artist {i}',
            'genre': genre,
            'danceability': danceability,
            'energy': energy,
            'loudness': np.random.uniform(-60, 0),
            'speechiness': np.random.uniform(0, 0.5),
            'acousticness': acousticness,
            'instrumentalness': np.random.uniform(0, 1),
            'liveness': np.random.uniform(0, 1),
            'valence': valence,
            'tempo': np.random.uniform(60, 180)
        }
        data.append(song)
        
    df = pd.DataFrame(data)
    df.to_csv('backend/data/music_data.csv', index=False)
    return df

if __name__ == "__main__":
    generate_sample_data()

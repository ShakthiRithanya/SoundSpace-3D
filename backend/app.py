from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
from services.pca_service import MusicPCA

app = Flask(__name__)
CORS(app)

# Load initial data
DATA_PATH = 'backend/data/music_data.csv'
pca_service = MusicPCA()

# Global state (simple for this demo)
current_df = None
current_results = None

def load_initial_data():
    global current_df, current_results
    if os.path.exists(DATA_PATH):
        try:
            current_df = pd.read_csv(DATA_PATH)
            # Ensure ID is processed if missing
            if 'id' not in current_df.columns:
                current_df['id'] = range(len(current_df))
            
            result = pca_service.process_data(current_df)
            current_results = result
            # Update current_df with x, y, cluster from results
            current_df = pd.DataFrame(result['data'])
            print("Initial data loaded and processed.")
        except Exception as e:
            print(f"Error loading initial data: {e}")

load_initial_data()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"})

@app.route('/api/data', methods=['GET'])
def get_data():
    global current_results
    if current_results is None:
         return jsonify({"error": "No data available"}), 404
    return jsonify(current_results)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    global current_df, current_results
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    try:
        df = pd.read_csv(file)
        # Basic validation
        if df.shape[0] < 5:
             return jsonify({"error": "Dataset too small (need at least 5 songs)"}), 400
             
        current_df = df
        if 'id' not in current_df.columns:
             current_df['id'] = range(len(current_df))
             
        result = pca_service.process_data(current_df)
        current_results = result
        current_df = pd.DataFrame(result['data'])
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/recommend', methods=['POST'])
def recommend():
    global current_df
    data = request.json
    target_id = data.get('song_id')
    
    if current_df is None:
        return jsonify({"error": "No data loaded"}), 400
        
    try:
        recs = pca_service.recommend(current_df, target_id=target_id)
        return jsonify(recs)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

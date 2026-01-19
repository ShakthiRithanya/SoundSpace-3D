# Sound Space 3D 🎵

A "Music Universe" visualization tool that maps high-dimensional audio features into a 3D space using Principal Component Analysis (PCA). Designed with a premium, Spotify-internal-tool aesthetic.

## 🌟 Features

*   **Interactive 2D Map**: visualized using Plotly.js, allowing zooming, panning, and hovering.
*   **PCA Engine**: Reduces 9 audio dimensions (Danceability, Energy, Acousticness, etc.) to 2 principal components.
*   **Taste Clusters**: Uses K-Means clustering to color-code distinct musical styles in the dataset.
*   **Explainable AI**:
    *   **Explained Variance**: Shows how much information is retained (e.g., ~46%).
    *   **Component Loadings**: Explains what each axis represents (e.g., "X-axis ≈ Energy vs Acousticness").
*   **Recommendations**: Click any song to find the nearest neighbors in the 2D PCA space (Euclidean distance).
*   **Taste Center**: Visualizes the centroid of the current dataset/playlist.

## 🏗️ Architecture

### Backend (`/backend`)
*   **Stack**: Python, Flask, Pandas, Scikit-Learn.
*   **Logic**:
    1.  **Ingestion**: Loads CSV data with audio features.
    2.  **Preprocessing**: Standardizes features using `StandardScaler` (Mean=0, Std=1).
    3.  **Dimensionality Reduction**: Applies PCA to project data onto 2 components.
    4.  **Clustering**: Applies K-Means (k=5) on the projected data for grouping.
    5.  **API**: Exposes endpoints for data retrieval and recommendation logic.

### Frontend (`/frontend`)
*   **Stack**: React, Vite, Plotly.js, Framer Motion.
*   **Design**: Custom CSS Glassmorphism theme (`0f172a` palette).
*   **State**: Manages upload, selection, and visualization state.

## 🚀 How to Run

### Prerequisites
*   Python 3.8+
*   Node.js 16+

### 1. Start Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Server runs on `http://localhost:5000`.

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Client runs on `http://localhost:5173`.

## 🧠 Logical Details

### PCA (Principal Component Analysis)
We use PCA to visualize the "structure" of music taste. 
*   **Input**: 9-dimensional vector per song (audio features).
*   **Transformation**: Rotates the axes to maximize variance.
*   **Output**: The X-axis (PC1) usually captures the largest spread (e.g., High Energy vs Low Energy), and the Y-axis (PC2) captures the next largest variation (e.g., Acoustic vs Electronic).

### Recommendations
Recommendations are based on **Euclidean Distance** in the reduced 2D PCA space. This ensures that songs that *look* close together on the map are mathematically similar in the dominant aesthetic features.

## 📂 Project Structure
```
music-map/
├── backend/
│   ├── data/           # Storage for CSV datasets
│   ├── services/       # PCA and Recommendation logic
│   ├── app.py          # Flask entry point
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/ # React components (Map, Panels)
│   │   ├── App.jsx     # Main layout
│   │   └── App.css     # Global styles & Glassmorphism
│   └── package.json
└── README.md
```

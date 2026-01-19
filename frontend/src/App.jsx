import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Music, Activity, Settings, Info } from 'lucide-react';
import MusicMap from './components/MusicMap';
import ControlPanel from './components/ControlPanel';
import InfoPanel from './components/InfoPanel';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data", err);
      setError("Failed to load music data. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      setData(response.data);
      setError(null);
      setSelectedSong(null);
      setRecommendations([]);
    } catch (err) {
      console.error("Upload error", err);
      setError("Failed to process file.");
    } finally {
      setLoading(false);
    }
  };

  const handleSongSelect = async (song) => {
    setSelectedSong(song);
    // Fetch recommendations for this song
    try {
      const response = await axios.post('http://localhost:5000/api/recommend', { song_id: song.id });
      setRecommendations(response.data);
    } catch (err) {
      console.error("Recommendation error", err);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Controls */}
      <div className="sidebar glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ background: 'var(--accent-color)', borderRadius: '8px', padding: '8px' }}>
            <Music color="#0f172a" size={24} />
          </div>
          <h2>Sound Space 3D</h2>
        </div>

        <ControlPanel onUpload={handleFileUpload} />

        <div style={{ marginTop: 'auto' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Visualizing high-dimensional audio features in 3D space using PCA.
          </p>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="main-view glass-panel">
        {loading && (
          <div className="loading-overlay">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Activity size={48} color="var(--accent-color)" />
            </motion.div>
          </div>
        )}

        {error && (
          <div className="loading-overlay">
            <div style={{ textAlign: 'center' }}>
              <h3>Error</h3>
              <p>{error}</p>
              <button className="btn-primary" onClick={fetchData}>Retry</button>
            </div>
          </div>
        )}

        {data && (
          <MusicMap
            data={data}
            onSelect={handleSongSelect}
            selectedSong={selectedSong}
            recommendations={recommendations}
          />
        )}
      </div>

      {/* Right Info Panel */}
      <div className="info-panel">
        <InfoPanel
          selectedSong={selectedSong}
          recommendations={recommendations}
          pcaData={data}
          onSelectRecommendation={handleSongSelect}
        />
      </div>
    </div>
  );
}

export default App;

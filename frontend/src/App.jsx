import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import MusicMap from './components/MusicMap';
import ControlPanel from './components/ControlPanel';
import InfoPanel from './components/InfoPanel';
import TopBar from './components/TopBar';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false); // Start false to show hero if no data
  const [error, setError] = useState(null);

  // App Config State
  const [config, setConfig] = useState({
    dataSource: 'local',
    viewMode: '3D', // '2D' or '3D'
    clustering: true,
    kValue: 5,
    features: {
      danceability: true, energy: true, tempo: true, valence: true,
      acousticness: true, instrumentalness: true, loudness: true, speechiness: true
    }
  });

  // Initial Load
  useEffect(() => {
    // We can auto-load default data if we want, or wait for user action
    // For "Product" feel, maybe load default so it's not empty?
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
      // Don't show critical error on load, maybe just empty state
      // setError("Failed to connect to backend.");
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
      setError("Failed to process file.");
    } finally {
      setLoading(false);
    }
  };

  const handleSongSelect = async (song) => {
    setSelectedSong(song);
    try {
      const response = await axios.post('http://localhost:5000/api/recommend', { song_id: song.id });
      setRecommendations(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-layout">
      <TopBar
        onUploadClick={() => document.getElementById('file-upload-trigger')?.click()}
        onConnectSpotify={() => alert("Spotify Integration coming in Phase 2!")}
      />

      <div className="content-wrapper">
        {/* LEFT SIDEBAR */}
        <div className="sidebar-container">
          <ControlPanel
            onUpload={handleFileUpload}
            settings={config}
            onSettingsChange={setConfig}
          />
        </div>

        {/* MAIN MAP AREA */}
        <div className="map-container">
          {loading && (
            <div className="loading-overlay">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Activity size={48} color="#38bdf8" />
              </motion.div>
              <p style={{ marginTop: '20px', color: '#94a3b8' }}>Mapping the Music Universe...</p>
            </div>
          )}

          {!loading && !data && (
            <div className="hero-empty-state">
              <h1 className="hero-title">Visualize your <span className="text-gradient">Music Taste</span></h1>
              <p className="hero-subtitle">Upload your Spotify history or use our sample dataset to explore your audio features in 3D space.</p>
              <button className="btn-primary" onClick={fetchData} style={{ fontSize: '16px', padding: '12px 32px' }}>
                Load Demo Data
              </button>
            </div>
          )}

          {data && (
            <MusicMap
              data={data}
              onSelect={handleSongSelect}
              selectedSong={selectedSong}
              recommendations={recommendations}
              is3D={config.viewMode === '3D'}
            />
          )}
        </div>

        {/* RIGHT INFO PANEL */}
        <div className="info-container">
          <InfoPanel
            selectedSong={selectedSong}
            recommendations={recommendations}
            pcaData={data}
            onSelectRecommendation={handleSongSelect}
          />
        </div>
      </div>

      {/* Hidden Input for Global Upload Trigger */}
      <input
        id="file-upload-trigger"
        type="file"
        accept=".csv"
        onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default App;

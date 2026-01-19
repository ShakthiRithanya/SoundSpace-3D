import React, { useState } from 'react';
import { Upload, Settings, Sliders, Database, Layers } from 'lucide-react';

const ControlPanel = ({
    onUpload,
    settings,
    onSettingsChange
}) => {

    // Default settings if not provided
    const config = settings || {
        dataSource: 'local',
        features: {
            danceability: true,
            energy: true,
            tempo: true,
            valence: true,
            acousticness: true,
            instrumentalness: true,
            loudness: true,
            speechiness: true
        },
        viewMode: '3D',
        clustering: true,
        kValue: 5
    };

    const handleFeatureToggle = (feature) => {
        onSettingsChange({
            ...config,
            features: {
                ...config.features,
                [feature]: !config.features[feature]
            }
        });
    };

    const handleConfigChange = (key, value) => {
        onSettingsChange({
            ...config,
            [key]: value
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '10px 0' }}>

            {/* Data Source Section */}
            <div>
                <h3 className="section-header"><Database size={14} /> DATA SOURCE</h3>
                <div className="glass-panel" style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <button
                            className={`tile-select ${config.dataSource === 'spotify' ? 'active' : ''}`}
                            onClick={() => handleConfigChange('dataSource', 'spotify')}
                        >
                            Spotify
                        </button>
                        <button
                            className={`tile-select ${config.dataSource === 'local' ? 'active' : ''}`}
                            onClick={() => handleConfigChange('dataSource', 'local')}
                        >
                            Local
                        </button>
                    </div>

                    {config.dataSource === 'local' && (
                        <label className="btn-dashed">
                            <Upload size={14} />
                            <span>Upload CSV Dataset</span>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </label>
                    )}

                    {config.dataSource === 'spotify' && (
                        <div style={{ textAlign: 'center', padding: '10px', color: '#94a3b8', fontSize: '13px' }}>
                            <p>Connect your account to visualize your personal "On Repeat" or "Liked Songs".</p>
                            <button className="btn-primary" style={{ width: '100%', marginTop: '10px', background: '#1db954', color: 'white' }}>Connect</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Feature Selection */}
            <div>
                <h3 className="section-header"><Sliders size={14} /> FEATURES</h3>
                <div className="glass-panel" style={{ padding: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {Object.keys(config.features).map(f => (
                            <div
                                key={f}
                                className={`feature-checkbox ${config.features[f] ? 'active' : ''}`}
                                onClick={() => handleFeatureToggle(f)}
                            >
                                <div className="checkbox-indicator" />
                                <span>{f.charAt(0).toUpperCase() + f.slice(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Analysis Controls */}
            <div>
                <h3 className="section-header"><Layers size={14} /> ANALYSIS</h3>
                <div className="glass-panel" style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    {/* View Mode */}
                    <div className="control-row">
                        <span>Dimensions</span>
                        <div className="toggle-group">
                            <button
                                className={config.viewMode === '2D' ? 'active' : ''}
                                onClick={() => handleConfigChange('viewMode', '2D')}
                            >2D</button>
                            <button
                                className={config.viewMode === '3D' ? 'active' : ''}
                                onClick={() => handleConfigChange('viewMode', '3D')}
                            >3D</button>
                        </div>
                    </div>

                    {/* Clustering */}
                    <div className="control-row">
                        <span>Cluster Colors</span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={config.clustering}
                                onChange={(e) => handleConfigChange('clustering', e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {/* K Value */}
                    {config.clustering && (
                        <div>
                            <div className="control-row" style={{ marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Clusters (K): <strong>{config.kValue}</strong></span>
                            </div>
                            <input
                                type="range"
                                min="2"
                                max="10"
                                value={config.kValue}
                                onChange={(e) => handleConfigChange('kValue', parseInt(e.target.value))}
                                className="range-slider"
                            />
                        </div>
                    )}

                    <button className="btn-primary" style={{ width: '100%', marginTop: '5px' }}>
                        Recompute Map
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ControlPanel;

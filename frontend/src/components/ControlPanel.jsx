import React from 'react';
import { Upload, RefreshCw } from 'lucide-react';

const ControlPanel = ({ onUpload }) => {
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '15px' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '14px', color: '#94a3b8' }}>DATA SOURCE</h3>

                <label className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', width: '100%', boxSizing: 'border-box' }}>
                    <Upload size={16} />
                    <span>Upload Dataset</span>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>

                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '10px' }}>
                    Supports CSV with audio features (danceability, energy, etc.)
                </p>
            </div>

            <div className="glass-panel" style={{ padding: '15px' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '14px', color: '#94a3b8' }}>CONTROLS</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px' }}>Feature Subset</span>
                        <span style={{ fontSize: '11px', color: '#38bdf8' }}>All Active</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px' }}>Clustering</span>
                        <span style={{ fontSize: '11px', color: '#38bdf8' }}>K-Means (5)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;

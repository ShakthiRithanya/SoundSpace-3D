import React from 'react';
import { Music, Upload, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const TopBar = ({ onUploadClick, onConnectSpotify }) => {
    return (
        <div className="glass-panel" style={{
            height: 'auto',
            margin: '75px 32px 20px 32px', /* Moved down ~2cm */
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '32px 40px',
            borderRadius: '24px',
            border: '1px solid var(--glass-border)'
        }}>
            {/* Logo Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 0 25px rgba(56,189,248,0.5)'
                }}>
                    <Music color="#fff" size={56} />
                </div>
                <h1 style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-2px' }}>
                    Sonic<span style={{ color: '#38bdf8' }}>Map</span>
                </h1>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '24px' }}>
                <button
                    className="btn-secondary"
                    onClick={onConnectSpotify}
                    style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        padding: '24px 40px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        borderRadius: '16px',
                        borderWidth: '2px'
                    }}
                >
                    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Spotify" style={{ height: '40px' }} />
                    Connect Spotify
                </button>

                <button
                    className="btn-secondary"
                    onClick={onUploadClick}
                    style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        padding: '24px 40px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        borderRadius: '16px',
                        borderWidth: '2px'
                    }}
                >
                    <Upload size={40} />
                    Upload CSV
                </button>

                <button
                    className="btn-ghost"
                    style={{ color: '#94a3b8', padding: '8px' }}
                >
                    <Info size={18} />
                </button>
            </div>
        </div>
    );
};

export default TopBar;

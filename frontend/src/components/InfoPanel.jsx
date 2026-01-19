import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const InfoPanel = ({ selectedSong, recommendations, pcaData, onSelectRecommendation }) => {
    const loadings = pcaData ? pcaData.loadings : [];
    const variance = pcaData ? pcaData.explained_variance : [0, 0];

    const getTopFeatures = (pc) => {
        if (!loadings.length) return [];
        // Sort by absolute value of the component weight
        const sorted = [...loadings].sort((a, b) => Math.abs(b[pc]) - Math.abs(a[pc]));
        return sorted.slice(0, 3).map(f => ({
            name: f.index,
            val: f[pc],
            sign: f[pc] > 0 ? '+' : '-'
        }));
    };

    const topPC1 = useMemo(() => getTopFeatures('PC1'), [loadings]);
    const topPC2 = useMemo(() => getTopFeatures('PC2'), [loadings]);
    const topPC3 = useMemo(() => getTopFeatures('PC3'), [loadings]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
            {/* Selected Song Details */}
            <div className="glass-panel" style={{ padding: '20px', minHeight: '150px' }}>
                <h3 style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {selectedSong ? 'Selected Track' : 'Select a Track'}
                </h3>

                {selectedSong ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 style={{ fontSize: '20px', marginTop: '10px', color: '#fff' }}>{selectedSong.name}</h2>
                        <p style={{ color: '#38bdf8', fontSize: '14px' }}>{selectedSong.artist}</p>
                        <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>
                                Cluster {selectedSong.cluster}
                            </span>
                            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>
                                {selectedSong.genre}
                            </span>
                        </div>
                    </motion.div>
                ) : (
                    <div style={{ marginTop: '20px', color: 'rgba(255,255,255,0.3)', fontSize: '14px', fontStyle: 'italic' }}>
                        Click on a point in the map to see details and recommendations.
                    </div>
                )}
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <div className="glass-panel" style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '12px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>
                        Recommended Nearby
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {recommendations.map((song) => (
                            <div
                                key={song.id}
                                onClick={() => onSelectRecommendation(song)}
                                style={{
                                    padding: '10px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                                className="recommendation-item"
                            >
                                <div>
                                    <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{song.name}</div>
                                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{song.artist}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PCA Explainability */}
            <div className="glass-panel" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>
                    Map Logistics
                </h3>

                {/* Variance */}
                <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '5px' }}>
                        <span>Explained Variance</span>
                        <span>{((variance[0] + variance[1] + (variance[2] || 0)) * 100).toFixed(1)}% Captured</span>
                    </div>
                    <div style={{ display: 'flex', height: '6px', colorgap: '2px' }}>
                        <div style={{ flex: variance[0], background: '#38bdf8', borderRadius: '2px' }} />
                        <div style={{ flex: variance[1], background: '#818cf8', borderRadius: '2px' }} />
                        <div style={{ flex: variance[2] || 0, background: '#f472b6', borderRadius: '2px' }} />
                        <div style={{ flex: 1 - ((variance[0] + variance[1] + (variance[2] || 0))), background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
                    </div>
                </div>

                {/* Axis Interpretation */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    <div>
                        <div style={{ fontSize: '10px', color: '#38bdf8', marginBottom: '5px', fontWeight: 'bold' }}>X (PC1)</div>
                        {topPC1.map(f => (
                            <div key={f.name} style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>
                                {f.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div style={{ fontSize: '10px', color: '#818cf8', marginBottom: '5px', fontWeight: 'bold' }}>Y (PC2)</div>
                        {topPC2.map(f => (
                            <div key={f.name} style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>
                                {f.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div style={{ fontSize: '10px', color: '#f472b6', marginBottom: '5px', fontWeight: 'bold' }}>Z (PC3)</div>
                        {topPC3.map(f => (
                            <div key={f.name} style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>
                                {f.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;

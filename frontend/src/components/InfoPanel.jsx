import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Disc, Share2, Heart, ExternalLink } from 'lucide-react';

const InfoPanel = ({ selectedSong, recommendations, pcaData, onSelectRecommendation }) => {

    // Helper to render a feature bar
    const FeatureBar = ({ label, value, color }) => (
        <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', color: '#cbd5e1' }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{label}</span>
                <span style={{ fontSize: '14px' }}>{Math.round(value * 100)}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                <div style={{ width: `${Math.min(value * 100, 100)}%`, height: '100%', background: color, borderRadius: '4px' }} />
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>

            {/* 1. Song Inspector Header (Album Art & Meta) */}
            <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

                {selectedSong ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={selectedSong.id}
                    >
                        {/* Mock Album Art - Gradient Placeholder */}
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '8px',
                            background: `linear-gradient(135deg, ${['#f472b6', '#38bdf8', '#fbbf24', '#34d399'][selectedSong.cluster % 4]} 0%, #1e293b 100%)`,
                            margin: '0 auto 16px auto',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Disc size={48} color="rgba(255,255,255,0.7)" />
                        </div>

                        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                            {selectedSong.name}
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
                            {selectedSong.artist}
                        </p>

                        {/* Actions */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <button className="btn-icon circle"><Heart size={16} /></button>
                            <button className="btn-primary" style={{ padding: '8px 24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Play size={16} fill="currentColor" /> Play
                            </button>
                            <button className="btn-icon circle"><Share2 size={16} /></button>
                        </div>
                    </motion.div>
                ) : (
                    <div style={{ padding: '40px 0', opacity: 0.5 }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Disc size={32} />
                        </div>
                        <p>Select a track on the map to inspect details.</p>
                    </div>
                )}
            </div>

            {/* 2. Audio DNA (Feature Bars) */}
            {selectedSong && (
                <div className="glass-panel" style={{ padding: '20px' }}>
                    <h3 className="section-header">AUDIO DNA</h3>
                    <div style={{ marginTop: '15px' }}>
                        <FeatureBar label="Energy" value={selectedSong.energy} color="#f472b6" />
                        <FeatureBar label="Danceability" value={selectedSong.danceability} color="#38bdf8" />
                        <FeatureBar label="Acousticness" value={selectedSong.acousticness} color="#fbbf24" />
                        <FeatureBar label="Valence (Mood)" value={selectedSong.valence} color="#34d399" />
                    </div>
                </div>
            )}

            {/* 3. Similar Tracks */}
            {recommendations.length > 0 && (
                <div className="glass-panel" style={{ padding: '0', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 className="section-header" style={{ margin: 0 }}>SIMILAR VIBES</h3>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                        {recommendations.map((song, idx) => (
                            <div
                                key={song.id}
                                className="list-item"
                                onClick={() => onSelectRecommendation(song)}
                            >
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    color: 'rgba(255,255,255,0.5)'
                                }}>
                                    {idx + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '15px', fontWeight: '600' }}>{song.name}</div>
                                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>{song.artist}</div>
                                </div>
                                <ExternalLink size={16} color="#475569" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default InfoPanel;

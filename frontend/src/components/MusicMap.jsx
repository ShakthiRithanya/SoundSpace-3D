import React from 'react';
import Plot from 'react-plotly.js';

const MusicMap = ({ data, onSelect, selectedSong, recommendations }) => {
    const points = data.data;
    const centroid = data.centroid;

    // Prepare traces
    const traces = [];

    // 1. All Songs (Base Layer)
    // Group by Cluster for coloring
    const clusters = [...new Set(points.map(p => p.cluster))];

    // Define a nice color palette for clusters
    const colors = ['#38bdf8', '#f472b6', '#a78bfa', '#fbbf24', '#34d399', '#f87171'];

    clusters.forEach((cluster, idx) => {
        const clusterPoints = points.filter(p => p.cluster === cluster);
        traces.push({
            x: clusterPoints.map(p => p.x),
            y: clusterPoints.map(p => p.y),
            z: clusterPoints.map(p => p.z),
            mode: 'markers',
            type: 'scatter3d',
            name: `Cluster ${cluster}`,
            text: clusterPoints.map(p => `${p.name} - ${p.artist}`),
            customdata: clusterPoints, // Store full object to retrieve on click
            marker: {
                size: 4,
                color: colors[cluster % colors.length],
                opacity: 0.8,
                line: { width: 0 }
            },
            hoverinfo: 'text',
        });
    });

    // 2. Recommendations (if any)
    if (recommendations.length > 0) {
        traces.push({
            x: recommendations.map(p => p.x),
            y: recommendations.map(p => p.y),
            z: recommendations.map(p => p.z),
            mode: 'markers',
            type: 'scatter3d',
            name: 'Recommended',
            text: recommendations.map(p => `RECOMMENDED: ${p.name}`),
            marker: {
                size: 10,
                color: '#ffffff',
                symbol: 'diamond',
                opacity: 1,
                line: { color: '#f59e0b', width: 5 }
            },
            hoverinfo: 'text'
        });
    }

    // 3. Selected Song (Highlighter)
    if (selectedSong) {
        traces.push({
            x: [selectedSong.x],
            y: [selectedSong.y],
            z: [selectedSong.z],
            mode: 'markers',
            type: 'scatter3d',
            name: 'Selected',
            text: [selectedSong.name],
            marker: {
                size: 12,
                color: '#ffffff',
                opacity: 1,
                line: { color: '#38bdf8', width: 0 }
            },
            hoverinfo: 'text'
        });
    }

    // 4. Taste Center (Centroid)
    traces.push({
        x: [centroid[0]],
        y: [centroid[1]],
        z: [centroid[2]],
        mode: 'markers',
        type: 'scatter3d',
        name: 'Taste Center',
        marker: {
            size: 15,
            color: 'rgba(255, 255, 255, 0.4)',
            symbol: 'cross',
            line: { color: '#fff', width: 0 }
        },
        hoverinfo: 'name'
    });

    const layout = {
        autosize: true,
        title: {
            text: '',
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        scene: {
            xaxis: {
                title: 'Energetic',
                showgrid: true,
                gridcolor: 'rgba(255,255,255,0.1)',
                backgroundcolor: 'rgba(0,0,0,0)',
                showbackground: false,
                zerolinecolor: 'rgba(255,255,255,0.2)',
                tickfont: { color: '#94a3b8', size: 10 },
                titlefont: { color: '#38bdf8', size: 12 }
            },
            yaxis: {
                title: 'Acoustic',
                showgrid: true,
                gridcolor: 'rgba(255,255,255,0.1)',
                backgroundcolor: 'rgba(0,0,0,0)',
                showbackground: false,
                zerolinecolor: 'rgba(255,255,255,0.2)',
                tickfont: { color: '#94a3b8', size: 10 },
                titlefont: { color: '#818cf8', size: 12 }
            },
            zaxis: {
                title: 'Emotional',
                showgrid: true,
                gridcolor: 'rgba(255,255,255,0.1)',
                backgroundcolor: 'rgba(0,0,0,0)',
                showbackground: false,
                zerolinecolor: 'rgba(255,255,255,0.2)',
                tickfont: { color: '#94a3b8', size: 10 },
                titlefont: { color: '#f472b6', size: 12 }
            },
            camera: {
                eye: { x: 1.5, y: 1.5, z: 1.5 }
            }
        },
        showlegend: false,
        margin: { l: 0, r: 0, t: 0, b: 0 },
        hovermode: 'closest'
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Plot
                data={traces}
                layout={layout}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                onClick={(data) => {
                    const point = data.points[0];
                    if (point.customdata) {
                        onSelect(point.customdata);
                    }
                }}
                config={{
                    displayModeBar: true,
                    responsive: true,
                    displaylogo: false,
                    modeBarButtonsToRemove: []
                }}
            />
        </div>
    );
};

export default MusicMap;

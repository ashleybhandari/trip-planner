import React from 'react';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '500px',
  backgroundColor: '#e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
  fontSize: '1.2rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  position: 'relative',
};

const pinStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -100%)',
  width: '20px',
  height: '20px',
  backgroundColor: '#ff5555',
  borderRadius: '50%',
  boxShadow: '0 0 5px rgba(0,0,0,0.3)',
};

const MapView: React.FC = () => {
  return (
    <div style={containerStyle}>
      <div>Map Placeholder (Google Maps will appear here in production)</div>
      <div style={pinStyle} title="Marker Placeholder" />
    </div>
  );
};

export default MapView;
import React from 'react';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '400px',
  backgroundColor: '#e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
  fontSize: '1.2rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const MapView: React.FC = () => {
  return (
    <div style={containerStyle}>
      Map Placeholder (Google Maps will appear here in production)
    </div>
  );
};

export default MapView;
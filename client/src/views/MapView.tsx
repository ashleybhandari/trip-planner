import React from 'react';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '500px',
  backgroundImage: 'url("https://maps.gstatic.com/tactile/pane/default_geocode-2x.png")', // Placeholder static map
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid #ccc',
  borderRadius: '8px',
  position: 'relative',
};

const overlayTextStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '1rem',
  color: '#333',
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
      <div style={overlayTextStyle}>
        Map Placeholder (Google Maps will appear here in production)
      </div>
      <div style={pinStyle} title="Marker Placeholder" />
    </div>
  );
};

export default MapView;
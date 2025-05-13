import React, { useState } from 'react';

type Trip = {
  id: number;
  title: string;
  destination: string;
  date: string;
  status: 'archived';
};

const initialTrips: Trip[] = [
  { id: 1, title: 'Family Vacation', destination: 'Hawaii', date: '2024-06-15', status: 'archived' },
  { id: 2, title: 'Business Conference', destination: 'New York', date: '2023-11-03', status: 'archived' },
  { id: 3, title: 'Ski Trip', destination: 'Colorado', date: '2022-12-20', status: 'archived' },
];

const TripArchive: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [search, setSearch] = useState('');

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this trip from archive?')) {
      setTrips(trips.filter(t => t.id !== id));
    }
  };

  const filteredTrips = trips.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Archived Trips</h2>

      <input
        type="text"
        placeholder="Search by title or destination"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      {filteredTrips.length === 0 ? (
        <p>No archived trips found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Destination</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map(trip => (
              <tr key={trip.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{trip.title}</td>
                <td style={tdStyle}>{trip.destination}</td>
                <td style={tdStyle}>{trip.date}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleDelete(trip.id)} style={btnStyle}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px',
  borderBottom: '2px solid #ccc',
};

const tdStyle: React.CSSProperties = {
  padding: '10px',
};

const btnStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: '#d9534f',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default TripArchive;
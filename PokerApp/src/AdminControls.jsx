// src/AdminControls.js
import React from 'react';
import { useAuth } from './AuthContext';

const AdminControls = ({ resetUserCount }) => {
  const { user } = useAuth();

  // Solo mostrar si es el admin
  if (user?.email !== 'rickybarba@hotmail.com') return null;

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={resetUserCount} style={{
        backgroundColor: '#ff5555',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer'
      }}>
        Resetear límite diario
      </button>
    </div>
  );
};

export default AdminControls;

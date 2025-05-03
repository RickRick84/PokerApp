// src/SubscriptionOptions.jsx
import React, { useState } from 'react';
import './App.css';

const SubscriptionOptions = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="subscription-page">
      <h2>Planes de Suscripción</h2>

      <button onClick={handleGoHome} className="back-button">
        Volver a Home
      </button>

      <div className="subscription-options">
        <div className="subscription-card">
          <h3>Plan Basic</h3>
          <p>Acceso limitado al bot, 10 preguntas diarias.</p>
          <button onClick={handleClick}>Suscribirme</button>
        </div>

        <div className="subscription-card">
          <h3>Plan Pro</h3>
          <p>Acceso ilimitado, funciones premium y sorteos.</p>
          <button onClick={handleClick}>Suscribirme</button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-message">
          Tranca... se viene algo lindo 😉
        </div>
      )}
    </div>
  );
};

export default SubscriptionOptions;

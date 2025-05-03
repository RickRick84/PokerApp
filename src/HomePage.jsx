// src/HomePage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css';

function HomePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const audioRef = useRef(new Audio('/sounds/button-click.mp3'));
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) return;
    const savedLang = localStorage.getItem('pokerBotLang');
    if (['es', 'en', 'pt'].includes(savedLang)) {
      navigate(`/chat/${savedLang}`);
    }
  }, [user, navigate]);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" />;

  const playSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => console.error("Error playing sound:", err));
    }
  };

  const handleLanguageSelect = (lang) => {
    playSound();
    localStorage.setItem('pokerBotLang', lang);
    navigate(`/chat/${lang}`);
  };

  const handleSubscriptionClick = () => {
    playSound();
    navigate('/suscripciones');
  };  

  return (
    <div className="app homepage-container">
      <div className="language-selector">
        <button onClick={() => handleLanguageSelect('es')}>ESPAÑOL</button>
        <button onClick={() => handleLanguageSelect('pt')}>PORTUGUÊS</button>
        <button onClick={() => handleLanguageSelect('en')}>ENGLISH</button>
      </div>

      <button onClick={handleSubscriptionClick} className="subscription-button">
        Ver planes de suscripción
      </button>

      {showPopup && (
        <div className="popup-message">
          Tranca... se viene algo lindo 😉
        </div>
      )}
    </div>
  );
}

export default HomePage;

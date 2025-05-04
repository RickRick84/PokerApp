// src/SubscriptionPopup.jsx
import React, { useState } from 'react';
import './SubscriptionPopup.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

function SubscriptionPopup({ onClose, translations, lang }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const t = translations[lang] || translations['en'];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePlanClick = () => {
    // Acá en el futuro va la lógica real de pago
    alert(t.comingSoon || 'Coming soon 😉');
    handleLogout();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
      <button className="close-btn" onClick={handleLogout}>
  <FaTimes />
</button>
        <h2>{t.choosePlan}</h2>
        <p>{t.selectOne}</p>

        <div className="toggle-switch">
          <span>{t.monthly}</span>
          <label className="switch">
            <input type="checkbox" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} />
            <span className="slider round"></span>
          </label>
          <span>{t.annual}</span>
        </div>

        <div className="plans">
          <div className="plan">
            <h3>Basic</h3>
            <p className="price">
              {isAnnual ? '$86.40' : '$9'}<span>/{isAnnual ? t.year : t.month}</span>
            </p>
            <ul>
              <li>{t.support}</li>
              <li>{t.basicLimit}</li>
              <li>{t.oneTeam}</li>
            </ul>
            <button onClick={handlePlanClick}>{t.pickPlan}</button>
          </div>

          <div className="plan pro">
            <h3>Pro</h3>
            <p className="price">
              {isAnnual ? '$243.60' : '$29'}<span>/{isAnnual ? t.year : t.month}</span>
            </p>
            <ul>
              <li>{t.support}</li>
              <li>{t.proLimit}</li>
              <li>{t.unlimitedUsers}</li>
              <li>{t.prioritySupport}</li>
              <li>{t.exclusiveContent}</li>
            </ul>
            <button onClick={handlePlanClick}>{t.pickPlan}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPopup;

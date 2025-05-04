import React, { useState, useEffect } from 'react';
import buttons from './buttonLabels'; // Asegúrate de que el archivo existe

import './SidebarMenu.css'; // Estilo opcional para visualización limpia

const SidebarMenu = ({ currentLang }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // Siempre abierto en desktop

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // abierto en desktop, cerrado en mobile
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const labels = buttons[currentLang] || buttons.en;

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {isMobile && (
        <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '←' : '☰'}
        </button>
      )}
      {isOpen && (
        <ul className="sidebar-list">
          <li>{labels.shop}</li>
          <li>{labels.pokerTrips}</li>
          <li>{labels.buyTickets}</li>
          <li>{labels.giveaways}</li>
          <li>{labels.games}</li>
          <li>{labels.calendar}</li>
        </ul>
      )}
    </div>
  );
};

export default SidebarMenu;

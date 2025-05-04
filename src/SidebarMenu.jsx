import React, { useState, useEffect } from 'react';
import buttons from './buttonLabels';
import './SidebarMenu.css';

// ICONOS
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SidebarMenu = ({ currentLang }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const labels = buttons[currentLang] || buttons.en;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Botón de solapa para mobile */}
      {isMobile && (
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
        </button>
      )}

      {/* Lista de botones visibles solo si está abierto */}
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

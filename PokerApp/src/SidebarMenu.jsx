import React from 'react';
import './SidebarMenu.css';

// Asegura el path con prefijo base correcto si estás sirviendo desde /PokerApp/
const PokerBetLogo = '/PokerApp/pb_logo.png';

const SidebarMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo-container">
        <div className="sidebar-logo-box">
          <img src={PokerBetLogo} alt="PokerBet" className="sidebar-logo" />
        </div>
      </div>
      <button className="sidebar-link" onClick={toggleSidebar}>🧢 MERCHANDISING</button>
      <button className="sidebar-link" onClick={toggleSidebar}>🎟️ SORTEO SEMANAL</button>
      <button className="sidebar-link" onClick={toggleSidebar}>🎰 SORTEO MENSUAL</button>
      <button className="sidebar-link" onClick={toggleSidebar}>📆 CALENDARIO</button>
      <button className="sidebar-link" onClick={toggleSidebar}>📰 NEWS</button>
    </div>
  );
};

export default SidebarMenu;

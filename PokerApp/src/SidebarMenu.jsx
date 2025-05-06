import React from 'react';
import './SidebarMenu.css';
import PokerBetLogo from '/pb_logo.png';

const SidebarMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo-container">
        <div className="sidebar-logo-box">
          <img src={PokerBetLogo} alt="PokerBet" className="sidebar-logo" />
        </div>
      </div>
      <button className="sidebar-link">🧢 MERCHANDISING</button>
      <button className="sidebar-link">🎟️ SORTEO SEMANAL</button>
      <button className="sidebar-link">🎰 SORTEO MENSUAL</button>
      <button className="sidebar-link">📆 CALENDARIO</button>
      <button className="sidebar-link">📰 NEWS</button>
    </div>
  );
};

export default SidebarMenu;

// src/SidebarMenu.jsx
import React from 'react';
import './SidebarMenu.css';
import { ReactComponent as PokerBetLogo } from './PokerBetLogo.svg';

const SidebarMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo-box">
        <PokerBetLogo className="logo" />
      </div>

      <button className="sidebar-link">🧢 MERCHANDISING</button>
      <button className="sidebar-link">🎟️ SORTEO SEMANAL</button>
      <button className="sidebar-link">🎰 SORTEO MENSUAL</button>
      <button className="sidebar-link">✈️ PAQUETES DE VIAJE</button>
      <button className="sidebar-link">📆 CALENDARIO</button>
      <button className="sidebar-link">📰 NEWS</button>
    </div>
  );
};

export default SidebarMenu;

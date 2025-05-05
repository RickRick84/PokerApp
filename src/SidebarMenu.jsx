import React from 'react';
import './SidebarMenu.css';
import { GiPokerHand } from 'react-icons/gi';

function SidebarMenu({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <GiPokerHand size={24} />
        </button>
        <img src="/pb_logo.png" alt="Poker Bet" className="logo" />
      </div>
      <div className="sidebar-links">
        <button className="sidebar-link">🧢 Merchandising Código Poker</button>
        <button className="sidebar-link">🎟️ Sorteo Semanal Tickets Online (solo para subscriptores BASIC y PRO)</button>
        <button className="sidebar-link">🎰 Sorteo Mensual Ticket Live Internacional (solo PRO)</button>
        <button className="sidebar-link">✈️ Paquetes de Viaje (con opción VIP, con chofer, hotel y seguridad)</button>
        <button className="sidebar-link">📆 Calendario de torneos Live & Online</button>
        <button className="sidebar-link">📰 NEWS (NOTICIAS)</button>
      </div>
    </div>
  );
}

export default SidebarMenu;

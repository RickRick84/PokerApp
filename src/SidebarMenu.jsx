// src/SidebarMenu.jsx
import React from 'react';
import './SidebarMenu.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function SidebarMenu({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <ul className="sidebar-list">
        <li>POKER BET</li>
        <li>NEWS</li>
        <li>PREMIUM TRIPS</li>
        <li>RANKINGS</li>
        <li>DISCORD</li>
        <li>CONTACT</li>
      </ul>
    </div>
  );
}

export default SidebarMenu;

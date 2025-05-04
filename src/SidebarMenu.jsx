import React, { useState, useEffect } from 'react';
import buttons from './buttonLabels';
import './SidebarMenu.css';
import { GiPokerHand } from 'react-icons/gi';
import { FaNewspaper } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SidebarMenu = ({ currentLang, setShowPopup }) => {
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
    <div className={`sidebar right ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
      </button>

      {isOpen && (
        <ul className="sidebar-list">
          <li onClick={() => setShowPopup(true)}>{labels.shop}</li>
          <li onClick={() => setShowPopup(true)}>{labels.pokerTrips}</li>
          <li onClick={() => setShowPopup(true)}>{labels.buyTickets}</li>
          <li onClick={() => setShowPopup(true)}>{labels.giveaways}</li>
          <li onClick={() => setShowPopup(true)}>{labels.games}</li>
          <li onClick={() => setShowPopup(true)}>{labels.calendar}</li>
          <li onClick={() => setShowPopup(true)}><GiPokerHand /> {labels.pokerBet}</li>
          <li onClick={() => setShowPopup(true)}><FaNewspaper /> {labels.news}</li>
        </ul>
      )}
    </div>
  );
};

export default SidebarMenu;

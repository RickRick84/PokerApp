import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { FaSignOutAlt, FaCogs, FaUser, FaNewspaper } from 'react-icons/fa';
import { GiPokerHand } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import './UserMenu.css';

function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = {
    account: 'Account',
    settings: 'Settings',
    signOut: 'Sign out',
    pokerBet: 'POKER BET',
    news: {
      en: 'News',
      es: 'Noticias',
      fr: 'Actualités',
      ru: 'Новости',
      ja: 'ニュース',
      zh: '新闻',
      de: 'Nachrichten',
      it: 'Notizie',
      ar: 'أخبار',
      pt: 'Notícias',
      tr: 'Haberler',
    },
  };

  const browserLang = navigator.language?.slice(0, 2) || 'en';
  const newsLabel = t.news[browserLang] || t.news.en;

  return (
    <div className="user-menu" ref={menuRef}>
      <img
        src={user?.photoURL}
        alt="Profile"
        className="user-avatar"
        onClick={toggleMenu}
      />
      {open && (
        <div className="menu-dropdown">
          <div onClick={() => alert('Account')}><FaUser /> {t.account}</div>
          <div onClick={() => alert('Settings')}><FaCogs /> {t.settings}</div>
          <div onClick={() => alert('Poker Bet')}><GiPokerHand /> {t.pokerBet}</div>
          <div onClick={() => alert('News')}><FaNewspaper /> {newsLabel}</div>
          <div onClick={() => { logout(); navigate("/login"); }}><FaSignOutAlt /> {t.signOut}</div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;

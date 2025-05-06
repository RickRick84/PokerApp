// src/LogoutIcon.jsx
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { FiLogOut } from 'react-icons/fi';
import './App.css';

const LogoutIcon = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/PokerApp/login');
  };

  return (
    <button className="logout-icon" onClick={handleLogout} title="Cerrar sesión">
      <FiLogOut size={20} />
    </button>
  );
};

export default LogoutIcon;

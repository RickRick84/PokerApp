// src/LoginPage.jsx
import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      const lang = localStorage.getItem('pokerBotLang');
      if (lang) {
        navigate(`/chat/${lang}`);
      } else {
        navigate('/'); // va a HomePage para elegir idioma
      }
    }
  }, [user, loading, navigate]);

  if (loading) return <p className="loading-text">Cargando...</p>;

  return (
    <div className="auth-form-container">
      {user ? (
        <div className="user-logged-in">
          <p className="welcome-text">Bienvenido, {user.displayName || user.email}</p>
          <LogoutButton />
        </div>
      ) : (
        <div className="auth-forms">
          <LoginForm />
          <RegisterForm />
        </div>
      )}
    </div>
  );
};

export default LoginPage;

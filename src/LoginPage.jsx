import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './LoginPage.css';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      const supportedLangs = ['es', 'en', 'pt'];
      const browserLang = navigator.language.slice(0, 2);
      const lang = supportedLangs.includes(browserLang) ? browserLang : 'es';
      localStorage.setItem('pokerBotLang', lang);
      navigate(`/chat/${lang}`);
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

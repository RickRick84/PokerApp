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
      localStorage.removeItem('pokerBotLang'); // 🧹 Forzar selección al entrar
      navigate('/'); // 👉 Redirige siempre al selector de idioma
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

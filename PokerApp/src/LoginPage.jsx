// src/LoginPage.jsx
import { useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from './AuthContext';
import { auth } from './firebaseConfig';
import './LoginPage.css';
import LogoutIcon from './LogoutIcon';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const supportedLangs = ['es', 'en', 'pt'];
      const browserLang = navigator.language.slice(0, 2);
      const lang = supportedLangs.includes(browserLang) ? browserLang : 'es';
      navigate(`/chat/${lang}`);
    }
  }, [user, loading, navigate]);

  const loginWithGoogle = async () => {
    setError(null);
    setLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError('Error al iniciar con Google');
      console.error(err.message);
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoadingForm(true);
    
    if (isRegistering && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoadingForm(false);
      return;
    }
    
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err) {
      setError('No pudimos verificar tus datos. Asegurate de que el email esté bien escrito y la contraseña sea correcta.');
      console.error(err.message);
    } finally {
      setLoadingForm(false);
    }
  };

  if (loading) return <p className="loading-text">Cargando...</p>;

  return (
    <div className="auth-form-container">
      {user ? (
        <div className="user-logged-in">
          <p className="welcome-text">Bienvenido, {user.displayName || user.email}</p>
          <LogoutIcon />
        </div>
      ) : (
        <div className="auth-forms">
          <h2>{isRegistering ? 'Registrarse' : 'Iniciar sesión'}</h2>

          {error && <p className="auth-error">{error}</p>}
          {loadingGoogle && <div className="loading-bar google" />}

          <button
            onClick={loginWithGoogle}
            className="google-button"
            disabled={loadingGoogle}
          >
            {loadingGoogle ? 'Conectando...' : 'Entrar con Google'}
          </button>

          <form onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
<input
  type="password"
  placeholder="Contraseña (mínimo 6 caracteres)"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
{isRegistering && (
  <small className="password-hint">
    La contraseña debe tener al menos 6 caracteres. Se recomienda incluir una mayúscula y un número.
  </small>
)}

            <button type="submit" disabled={loadingForm}>
              {loadingForm
                ? isRegistering
                  ? 'Registrando...'
                  : 'Entrando...'
                : isRegistering
                ? 'Registrarse'
                : 'Entrar'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="toggle-button-form"
          >
            {isRegistering
              ? '¿Ya tienes cuenta? Inicia sesión'
              : '¿No tienes cuenta? Registrate'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

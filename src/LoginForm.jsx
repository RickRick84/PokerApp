// src/LoginForm.jsx
import { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebaseConfig';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  const loginWithGoogle = async () => {
    setError(null);
    setLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error('Error al iniciar con Google:', err.message);
      setError('Error al iniciar con Google');
      setLoadingGoogle(false);
    }
  };

  const loginWithEmail = async (e) => {
    e.preventDefault();
    setError(null);
    setLoadingEmail(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Error al iniciar con correo:', err.message);
      setError('Correo o contraseña incorrectos');
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Iniciar sesión</h2>

      {error && <p className="auth-error">{error}</p>}
      {loadingGoogle && <div className="loading-bar google" />}

      <button
        onClick={loginWithGoogle}
        className="google-button"
        disabled={loadingGoogle}
      >
        {loadingGoogle ? 'Conectando...' : 'Entrar con Google'}
      </button>

      <form onSubmit={loginWithEmail}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loadingEmail}>
          {loadingEmail ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <style jsx>{`
        .loading-bar.google {
          height: 3px;
          width: 100%;
          background: linear-gradient(to right, #4285f4, #34a853, #fbbc05, #ea4335);
          animation: loadingAnim 2s linear infinite;
          border-radius: 3px;
          margin-bottom: 12px;
        }

        @keyframes loadingAnim {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;

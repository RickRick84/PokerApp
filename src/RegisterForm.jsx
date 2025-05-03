// src/RegisterForm.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Error registro:", err.message);
      setError("No se pudo crear la cuenta. Verificá el correo y la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Crear cuenta</h2>
      {error && <p className="auth-error">{error}</p>}
      {loading && <div className="loading-bar google" />}

      <form onSubmit={register}>
        <input
          type="email"
          placeholder="Correo"
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
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
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

export default RegisterForm;

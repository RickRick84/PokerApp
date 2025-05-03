// src/LogoutButton.js
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Error cerrando sesión:", err.message);
      alert("No se pudo cerrar sesión. Intentalo de nuevo.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-button"
      aria-label="Cerrar sesión"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;

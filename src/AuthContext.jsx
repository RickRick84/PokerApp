// src/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "./firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("👤 Usuario detectado:", firebaseUser);
      setUser(firebaseUser);
      setLoading(false);
    });

    // 🟢 Captura el login por redirección (Google)
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          console.log("✅ Login con Google OK:", result.user);
          setUser(result.user);
        }
      })
      .catch((err) => {
        console.error("❌ Error en getRedirectResult:", err.message);
      });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

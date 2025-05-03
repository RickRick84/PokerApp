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
      setLoading(false); // ✅ Marca como cargado
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          console.log("✅ Login con Google OK:", result.user);
          setUser(result.user);
          setLoading(false); // ✅ ACÁ estaba faltando: importantísimo
        }
      })
      .catch((err) => {
        console.error("❌ Error en getRedirectResult:", err.message);
        setLoading(false); // ✅ Aún si falla, hay que terminar el loading
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

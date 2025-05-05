// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import { AuthProvider, useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return user ? element : <Navigate to="/PokerApp/login" replace />;
};

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return (
    <Routes>
      <Route path="/PokerApp" element={user ? <Navigate to="/PokerApp/chat" replace /> : <LoginPage />} />
<Route path="/PokerApp/login" element={user ? <Navigate to="/PokerApp/chat" replace /> : <LoginPage />} />
<Route path="/PokerApp/chat" element={<ProtectedRoute element={<ChatPage />} />} />
<Route path="*" element={<Navigate to="/PokerApp" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

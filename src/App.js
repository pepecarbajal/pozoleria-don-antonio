// src/App.js

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio/Inicio';
import Reservar from './components/Reservacion/Reservar';
import UserReservations from './components/Usuario/UserReservations';
import Login from './components/Usuario/Login';
import Register from './components/Usuario/Register';
import Administrador from './components/Administrador/Administrador';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/reservar" element={<Reservar user={user} />} />
        <Route path="/reservaciones" element={<UserReservations user={user} />} />
        <Route path="/iniciar-sesion" element={<Login onLogin={handleLogin} />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/administrador" element={<Administrador />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;


import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import UserAccount from "./Usuario/UserAccount";
import logo from "../img/logo-don-antonio.jpg"

const MobileMenu = ({ isOpen, onClose, user, onShowUserAccount }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors text-left" onClick={onClose}>Inicio</Link>
          {user && (
            <Link to="/reservar" className="text-gray-300 hover:text-white transition-colors text-left" onClick={onClose}>Reservar</Link>
          )}
          {user && !user.administrador && (
            <Link to="/reservaciones" className="text-gray-300 hover:text-white transition-colors text-left" onClick={onClose}>Reservaciones</Link>
          )}
          {user && user.administrador && (
            <Link to="/administrador" className="text-gray-300 hover:text-white transition-colors text-left" onClick={onClose}>Administrador</Link>
          )}
          {user ? (
            <button onClick={() => { onShowUserAccount(); onClose(); }} className="text-gray-300 hover:text-white transition-colors text-left focus:outline-none">
              Cuenta
            </button>
          ) : (
            <Link to="/iniciar-sesion" className="text-gray-300 hover:text-white transition-colors text-left" onClick={onClose}>Iniciar sesión</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleShowUserAccount = useCallback(() => {
    setShowUserAccount(true);
  }, []);

  const handleCloseUserAccount = useCallback(() => {
    setShowUserAccount(false);
  }, []);

  const handleLogout = useCallback(() => {
    onLogout();
    setShowUserAccount(false);
  }, [onLogout]);

  return (
    <>
      <nav className="bg-black/80 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Don Antonio Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="ml-2 text-xl sm:text-2xl font-bold text-white">Restaurante Don Antonio</span>
            </Link>
            <div className="hidden md:flex gap-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Inicio</Link>
              {user && (
                <Link to="/reservar" className="text-gray-300 hover:text-white transition-colors">Reservar</Link>
              )}
              {user && !user.administrador && (
                <Link to="/reservaciones" className="text-gray-300 hover:text-white transition-colors">Reservaciones</Link>
              )}
              {user && user.administrador && (
                <Link to="/administrador" className="text-gray-300 hover:text-white transition-colors">Administrador</Link>
              )}
              {user ? (
                <button onClick={handleShowUserAccount} className="text-gray-300 hover:text-white transition-colors focus:outline-none">
                  Cuenta
                </button>
              ) : (
                <Link to="/iniciar-sesion" className="text-gray-300 hover:text-white transition-colors">Iniciar sesión</Link>
              )}
            </div>
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={toggleMenu} 
          user={user} 
          onShowUserAccount={handleShowUserAccount}
        />
      </nav>
      {showUserAccount && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UserAccount
            user={user}
            onClose={handleCloseUserAccount}
            onLogout={handleLogout}
          />
        </div>
      )}
    </>
  );
}


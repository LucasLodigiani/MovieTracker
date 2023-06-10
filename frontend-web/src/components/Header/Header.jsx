import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-slate-900 shadow-md px-4 py-2">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white hover:text-gray-300">
          MovieTracker
        </Link>
        <div>
          <Link to="/Login" className="text-white hover:text-gray-300 mr-4">
            Iniciar Sesión
          </Link>
          <Link to="/Register" className="text-white hover:text-gray-300">
            Registrar
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
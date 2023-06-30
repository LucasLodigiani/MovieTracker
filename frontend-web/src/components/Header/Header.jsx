import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Shared/Modal';
import Users from '../Users/Users';
import CreateMovie from '../Movie/CreateMovie';
import { BiSolidUserDetail } from 'react-icons/bi';
import { BiMovie } from 'react-icons/bi';
import useAuthentication from '../../hooks/auth/useAuthentication ';
import { FaUserAstronaut } from 'react-icons/fa';
import Dropdown from '../Shared/Dropdown';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CgDarkMode } from 'react-icons/cg';
import { MdMovieFilter } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { ThemeContext } from '../../contexts/ThemeContext';
import Favorites from '../Movie/Favorites';

const Header = () => {
  const [userData, setUserData, isAuthenticated, isInRole, logout] = useAuthentication();
  const { theme, toggleTheme } = useContext(ThemeContext);
  document.body.className = theme === 'light' ? 'bg-rose-50' : 'bg-gradient-to-r from-gray-950 via-gray-950 to-gray-950';


  const headerClasses = `sticky top-0 left-0 right-0 z-10 shadow-md px-5 py-2 mb-3 ${theme === 'light' ? 'bg-gradient-to-r from-pink-950 to-rose-950 text-white' : 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white'
    }`;

  return (
    <header className={headerClasses}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <Link to="/" className={`text-xl font-bold ${theme === 'light' ? 'text-white hover:text-pink-700' : 'text-white hover:text-cyan-300'}  mr-5`}>
            MovieTracker
          </Link>
          {isInRole("Admin") && 
          <span className={`rounded-md ${theme === 'light' ? 'hover:text-pink-700' : 'hover:text-cyan-300'} px-5 `}>
            <Modal icon={<BiSolidUserDetail size={25} color="#235b8d" />} title="Panel de Usuarios">
              <Users />
            </Modal>
          </span> }
          {isInRole("Admin") && 
          <span className={`${theme === 'light' ? 'hover:text-pink-700' : 'hover:text-cyan-300'} px-5 `}>
            <Modal icon={<BiMovie size={25} color="#235b8d" />} title="Create Movie">
              <CreateMovie />
            </Modal>
          </span> }
          {isAuthenticated() && 
          <span className={`${theme === 'light' ? 'hover:text-pink-700' : 'hover:text-cyan-300'} px-5 `}>
            <Modal icon={<MdMovieFilter />} title="Favoritos" >
              <Favorites></Favorites>
            </Modal>
          </span> }
          
        </div>
        <div className="flex items-center justify-between text-blue-gray-900"></div>
        <div>
          {isAuthenticated() === true ? (
            <div className="flex items-center">
              <Dropdown icon={<IoMdArrowDropdown />} buttonText={<><p className={`mr-1 font-mono ${theme === 'light' ? 'hover:text-pink-700' : 'text-white hover:text-sky-500'}`}>Hola, {userData.name}!</p><FaUserAstronaut className={`${theme === 'light' ? 'text-pink-700' : 'text-white'}`} /></>}>
                <div className="flex flex-col">
                  <button onClick={toggleTheme} className={`flex-grow px-4 py-2 text-gray-800 ${theme === 'light' ? 'hover:bg-pink-700 hover:text-white' : 'hover:bg-violet-700 hover:text-white'
                    } flex items-center`}>
                    <CgDarkMode size={20} />
                    <p className="mb-0.5 ml-1">Cambiar Tema</p>
                  </button>
                  <button onClick={logout} className={`flex-grow px-4 py-2 text-gray-800 ${theme === 'light' ? 'hover:bg-pink-700 hover:text-white' : 'hover:bg-violet-700 hover:text-white'} flex items-center`}><BiLogOut size={20} />
                    <p className="mb-0.5 ml-1">Salir</p>
                  </button>
                </div>
              </Dropdown>
            </div>
          ) : (
            <>
              <Link to="/login" className={`rounded-md ${theme === 'light' ? 'hover:text-pink-700' : 'hover:text-cyan-300'} px-5 `}>
                Iniciar Sesión
              </Link>
              <Link to="/register" className={`rounded-md ${theme === 'light' ? 'hover:text-pink-700' : 'hover:text-cyan-300'} px-5 `}>
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
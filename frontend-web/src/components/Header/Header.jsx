import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Shared/Modal';
import Users from '../Users/Users';
import CreateMovie from '../Movie/CreateMovie';
import {BiSolidUserDetail} from "react-icons/bi"
import { BiMovie } from 'react-icons/bi';
import useAuthentication from '../../hooks/auth/useAuthentication ';
import { FaUserAstronaut } from 'react-icons/fa';
import Dropdown from '../Shared/Dropdown';
import { IoMdArrowDropdown } from 'react-icons/io'
import { CgDarkMode } from 'react-icons/cg'
import { BiLogOut } from 'react-icons/bi'


const Header = () => {
  const [userData, setUserData, isAuthenticated, isInRole, logout] = useAuthentication();

  return (
    <header className="sticky top-0 left-0 right-0 z-10 shadow-md px-5 py-2 bg-gradient-to-r from-blue-900 to-indigo-900 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <Link to="/" className="text-xl font-bold text-white hover:text-sky-600 mr-5">
            MovieTracker
          </Link>
          {/* <Link to="/movies" className="rounded-md  hover:text-sky-500	 px-5 ">
            Movies
          </Link>*/}
          <span className='rounded-md  hover:text-sky-500 px-5'>
            <Modal icon={<BiSolidUserDetail size={25} color="#235b8d"/>} title="Panel de Usuarios">
                  <Users/>
            </Modal>
          </span>
          <span className='rounded-md  hover:text-sky-500'>
            <Modal icon={<BiMovie size={25} color="#235b8d"/>} title="Create Movie">
                  <CreateMovie/>
            </Modal>
          </span>          
        </div>
        <div className="flex items-center justify-between text-blue-gray-900"></div>
        <div>
          {isAuthenticated() === true ? 
          <div className="flex items-center">
            <Dropdown icon={<IoMdArrowDropdown />} buttonText={<><p className="mr-1 hover:font-mono">Hola, {userData.name}!</p><FaUserAstronaut /></>}>
              <div className="flex flex-col">
                <button className="flex-grow px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white flex items-center">
                  <CgDarkMode size={20} />
                  <p className="mb-0.5 ml-1">Cambiar Tema</p>
                </button>
                <button
                  onClick={logout}
                  className="flex-grow px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white flex items-center"
                >
                  <BiLogOut size={20} />
                  <p className="mb-0.5 ml-1">Salir</p>
                </button>
              </div>
            </Dropdown>
          </div> : 
          <>
            <Link to="/login" className="rounded-md  hover:text-sky-500	 px-5 ">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="rounded-md  hover:text-sky-500	hover:text-gray-300 px-5 ">
              Registrar
            </Link>
          </>}
          
        </div>
      </div>
    </header>
  );
};

export default Header;

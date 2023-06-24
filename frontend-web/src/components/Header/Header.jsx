import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Shared/Modal';
import Users from '../Users/Users';
import CreateMovie from '../Movie/CreateMovie';
import {BiSolidUserDetail} from "react-icons/bi"
import { BiMovie } from 'react-icons/bi';
const Header = () => {
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
          <Link to="/login" className="rounded-md  hover:text-sky-500	 px-5 ">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="rounded-md  hover:text-sky-500	hover:text-gray-300 px-5 ">
            Registrar
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

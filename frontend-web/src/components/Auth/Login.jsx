import React, { useContext, useState } from 'react'
import useLogin from '../../hooks/auth/useLogin'
import { UserContext } from '../../contexts/UserContext';
import useAuthentication from '../../hooks/auth/useAuthentication ';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate()
  const [jwt, isUserLoading, userError, login] = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData, isAuthenticated, isInRole, Logout] = useAuthentication();

  const userNameHandler = (event) => {
    setUsername(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    await login({ username, password });
  }

  const handleLogout = () => {
    Logout();
  }

  //{`${theme === 'light' ? '' : ''}`}     <Link to="/" >Sign In </Link>
  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'gray text-gray-700'}`} >
      <div className={`relative flex flex-col m-6 space-y-8 ${theme === 'light' ? 'bg-white shadow-2xl' : 'bg-sky-500 shadow-2xl'}  rounded-2xl md:flex-row md:space-y-0'`}>
        <div className='flex flex-col justify-center p-8 md:p-14'>
          <label className={`mb-3 text-4xl font-bold ${theme === 'dark' ? 'text' : '' }`}>Bienvenido!</label>
          <div className='py-4'>
            <label className='mb-2 text-mb'>Usuario</label>
            <input type='text' onChange={userNameHandler} value={username} className={`w-full p-2 border ${theme === 'light' ? 'border-gray-700 ' : ' border-white'} rounded-md `}></input>
          </div>
          <div className='py-8'>
            <label className='mb-2 text-mb'>Contraseña</label>
            <input type='password' onChange={passwordHandler} value={password} className={`w-full p-2 border ${theme === 'light' ? 'border-gray-700 ' : ''} rounded-md `}></input>

          </div>
          <button onClick={handleLogin} className={`w-full ${theme === 'light' ? 'bg-red-800 text-white hover:bg-gradient-to-r from-red-500 to-rose-700' :''} p-2 rounded-lg mb-6 `}> Sign In</button>
          {userError && <p>{userError}</p>}
          
          <div className={`text-center ${theme === 'light' ? 'text-black' : ''}`}>No tiene una cuenta?
            <label className='font-bold'> <Link to="/register" className={`${theme === 'light' ? 'hover:text-pink-700' : 'hover:text-cyan-300'}`}>Registrese aqui!</Link></label>
          </div>
        </div>
        <div className='relative'>
        </div>
      </div>


{/* 

      {jwt && <p>jwt: {jwt}</p>} */}
      {/* {isUserLoading && <p>{isUserLoading}</p>}
      <p></p>
      <p>Bienvenido {user && user.name} !</p>

      <p>UserData: {userData && <span>{userData.name}</span>}</p>
      <button onClick={handleLogout}>Desloguear</button> */}
     
    </div>
  )
}

export default Login
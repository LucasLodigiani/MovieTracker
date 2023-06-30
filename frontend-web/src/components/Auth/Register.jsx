import React, { useState, useContext } from 'react';
import backgroundImage from '../../assets/images/movies-background.jpg';
import useAuth from '../../hooks/useAuth';
import { ThemeContext } from '../../contexts/ThemeContext';


//TO DO: Modularizar todo este componente.
const Register = () => {
  const { theme } = useContext(ThemeContext)
  const { Register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setCheckbox(event.target.checked)
  };

  const HandleRegister = async (event) => {
    event.preventDefault();
    setMessage(null);
    setIsLoading(true);
    const result = await Register({ username, email, password });
    setIsLoading(false);
    if (result.ok) {
      // Registro exitoso
      setMessage("El registro ha sido exitoso!")

    } else {
      // Error al registrar usuario
      setMessage("Ha ocurrido algun error...");

    }
  };

  return (
    <form className={`flex items-center justify-center min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'gray text-gray-700'}`}>
      <div className={`relative flex flex-col m-6 space-y-8 ${theme === 'light' ? 'bg-white shadow-2xl' : 'bg-indigo-900 shadow-2xl'}  rounded-2xl md:flex-row md:space-y-0'`}>
        <div className='flex flex-col justify-center p-8 md:p-14'>
          <label className={`mb-3 mx-20 text-4xl font-bold items-center ${theme === 'dark' ? 'text-white' : ''}`}>Registrate</label>
          <div className='py-4'>
            <label className={`mb-2 text-mb ${theme === 'light' ? 'text-black' : 'text-white'}`} htmlFor="username"> Nombre de usuario </label>
            <input className={`w-full p-2 border ${theme === 'light' ? 'border-gray-700 ' : 'bg-gray-700 text-white border-sky-700'} rounded-md `} id="username" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required />
          </div>
          <div className='py-4'>
            <label className={`mb-2 text-mb ${theme === 'light' ? 'text-black' : 'text-white'}`} htmlFor="email">Email</label>
            <input className={`w-full p-2 border ${theme === 'light' ? 'border-gray-700 ' : 'bg-gray-700 text-white border-sky-700'} rounded-md `} id="email" type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className='py-4'>
            <label className={`mb-2 text-mb ${theme === 'light' ? 'text-black' : 'text-white'}`} htmlFor="password">Contraseña</label>
            <input className={`w-full p-2 border ${theme === 'light' ? 'border-gray-700 ' : 'bg-gray-700 text-white border-sky-700'} rounded-md `} id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
  
          </div>
          <div className="flex items-center justify-center py-4">
           
          </div>
          {isLoading ? (
              <button
                className={`w-full ${theme === 'light' ? 'bg-red-500  hover:bg-red-700 text-dark' : 'bg-blue-500 hover:bg-blue-700 text-white'} font-bold py-2 px-4 rounded`}
                type="submit"
                disabled
              >
                Cargando...
              </button>
            ) : (
              <button className={`w-full ${theme === 'light' ? 'bg-red-800 text-white hover:bg-gradient-to-r from-red-500 to-rose-700' :'bg-gray-700 text-white hover:bg-gradient-to-r from-cyan-800 to-blue-600'} p-2 rounded-lg mb-6 `}type="submit"onClick={HandleRegister}>Registrar</button>

            )}
            {message && <p className={`${theme === 'light' ? 'text-red-800' : 'text-blue-200'}`}>{message}</p>}
        </div>
      </div>
    </form>

  );
};

export default Register;
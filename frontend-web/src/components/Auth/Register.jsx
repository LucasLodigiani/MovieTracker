import React, { useState } from 'react';
import backgroundImage from '../../assets/images/movies-background.jpg';


//TO DO: Modularizar todo este componente.
const Register = () => {
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

  const handleRegister = (event) => {
    event.preventDefault();

    // Enviar datos a la api.

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
      <form className="bg-slate-900 shadow-md px-10 py-8 w-96">
        <h1 className="text-white text-4xl font-bold mb-2">Crea una cuenta</h1>
        <div className="mb-8">
          <label className="text-white text-sm font-bold mb-2" htmlFor="username">
            Nombre de usuario
          </label>
          <input
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="mb-8">
          <label className="text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-8">
          <label className="text-white text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="border rounded w-full py-3 px-4 text-gray-700 leading-tight"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="mb-8">
          <input className="mr-2" type="checkbox" value={checkbox} onChange={handleCheckboxChange} />
          <p className="text-white inline-block align-middle">Acepto los términos y condiciones</p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={handleRegister}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
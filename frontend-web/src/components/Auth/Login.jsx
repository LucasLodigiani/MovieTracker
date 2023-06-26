import React, { useContext, useState } from 'react'
import useLogin from '../../hooks/auth/useLogin'
import { UserContext } from '../../contexts/UserContext';
import useAuthentication from '../../hooks/auth/useAuthentication ';

const Login = () => {
  const [jwt, isUserLoading, userError, login] = useLogin();
  const [username, setUsername] =useState("");
  const [password, setPassword] =useState("");
  const { user, setUser} = useContext(UserContext);
  const [userData, setUserData, isAuthenticated, isInRole, Logout] = useAuthentication();

  const userNameHandler = (event) => {
    setUsername(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = async (event) =>{
    event.preventDefault();
    await login({username, password});
  }

  const handleLogout = () => {
    Logout();
  }
  

  return (
    <div>
      <label>Ingrese su usuario</label>
      <input type='text' onChange={userNameHandler} value={username}></input>
      <label>Ingrese su contraseña</label>
      <input type='text' onChange={passwordHandler} value={password}></input>
      <button onClick={handleLogin}>Registrar</button>
      {jwt && <p>jwt: {jwt}</p>}
      {isUserLoading && <p>{isUserLoading}</p>}
      {userError && <p>{userError}</p>}
      <p>Context:</p>
      <p>{user && user.name}</p>

      <p>UserData: {userData && <span>{userData.name}</span>}</p>
      <button onClick={handleLogout}>Desloguear</button>
    </div>
  )
}

export default Login
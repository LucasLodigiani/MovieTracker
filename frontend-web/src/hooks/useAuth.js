import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { base_url } from '../utils/Config';

const useAuth = () => {
  const { user, setUser } = useContext(UserContext);

  const CheckTokenExpiration = () => {
    //Verifica la expiracion del token
  }

  const CheckRoles = () => {
    //Verifica los roles del usuario haciendo un post a la api, con el token jwt dentro del paylaod(body).
    //Si los roles son diferentes se genera un nuevo jwt con los roles actualizados para el usuario.
  }

  const Login = () => {
    //Loguear usuario
  };

  const Register = async (userData) => {
    //Registrar usuario
    console.log(userData);
    const response = await fetch(base_url + "/api/Users/Register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      // Registro exitoso
      console.log("El registro ha sido exitoso!" + response.json)
    } else {
      // Error al registrar usuario
      console.log("Ha ocurrido algun error..." + response.json);
    }
  };

  const Logout = () => {
    //Desloguear al usuario
  }

  return { CheckTokenExpiration, CheckRoles,Login, Register, Logout };
};

export default useAuth;
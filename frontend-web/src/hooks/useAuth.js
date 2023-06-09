import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

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

  const Register = () => {
    //Registrar usuario
  };

  const Logout = () => {
    //Desloguear al usuario
  }

  return { CheckTokenExpiration, CheckRoles,Login, Register, Logout };
};

export default useAuth;
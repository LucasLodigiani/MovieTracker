import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    //La idea es manejar esto como un objeto para almacenar muchos datos, por ejemplo: name, role, token.
  const [user, setUser] = useState(null);

  // Obtener el usuario del local storage al cargar la página y setearlo en el context.
  //JSON.parse convierte el string json guardado al loguearse a un objeto javascript.
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
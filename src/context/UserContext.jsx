import { createContext, useState, useEffect } from "react";
import { getProfile } from "../helpers/auth";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUserData = async () => {
    try {
      const response = await getProfile();
      if (response.ok && response.data) {
        setUser(response.data.usuario || response.data.user || response.data.data || response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const clearUserData = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loadUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
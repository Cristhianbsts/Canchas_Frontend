import { createContext, useState, useEffect, useCallback } from "react";
import { getProfile } from "../helpers/auth.js";

const UserContext = createContext(null);
const LOGOUT_FLAG_KEY = "auth:manual_logout";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const loadUserData = useCallback(async () => {
    if (localStorage.getItem(LOGOUT_FLAG_KEY) === "1") {
      setUser(null);
      setIsLoadingUser(false);
      return null;
    }

    setIsLoadingUser(true);
    try {
      const response = await getProfile();
      let nextUser = null;

      if (response.ok && response.data) {
        nextUser =
          response.data.usuario ||
          response.data.user ||
          response.data.data ||
          response.data;
      }

      if (nextUser?.active === false) {
        setUser(null);
        return nextUser;
      }

      setUser(nextUser);
      return nextUser;
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      setUser(null);
      return null;
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const clearUserData = () => {
    localStorage.setItem(LOGOUT_FLAG_KEY, "1");
    setUser(null);
    setIsLoadingUser(false);
  };

  return (
    <UserContext.Provider value={{ user, loadUserData, clearUserData, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

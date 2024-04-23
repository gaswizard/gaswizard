import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("jwtToken") ? true : false
  );

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setAuthenticated(true);
    }
  }, []);

 

  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.clear()
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("jwtToken") ? true : false
  );
  
  const [basePage, setBasePage] = useState( localStorage.getItem("page"));

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
    localStorage.clear();
  };
  const pageHandler = (baseurl, page) => {
 
    if (page == "crudo") {
      setBasePage(baseurl);
    } else {
      setBasePage(baseurl);
    }
   
    
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, pageHandler,basePage }}>
      {children}
    </AuthContext.Provider>
  );
};

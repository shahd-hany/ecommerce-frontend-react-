import { useEffect, useState, createContext } from "react";
import {jwtDecode} from "jwt-decode"; 

export const Token = createContext();

export default function TokenProvider({ children }) {
  const [UserToken, setUserToken] = useState(localStorage.getItem("usertoken"));
  const [userId, setuserId] = useState(null);

  useEffect(() => {
    if (UserToken) {
        const decoded = jwtDecode(UserToken); 
        setuserId(decoded.id || decoded._id); 
    }
  }, [UserToken]); 

  return (
    <Token.Provider value={{ UserToken, setUserToken, userId, setuserId }}>
      {children}
    </Token.Provider>
  );
}

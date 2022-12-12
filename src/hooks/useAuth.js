import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const googleLogout = () => {
    window.open(`http://localhost:8080/auth/logout`, "_self");
  };
  const googleAuth = () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };
  const getUser = async () => {
    try {
      const url = `http://localhost:8080/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log("data", data);
      setUser(data.user._json);
    } catch (error) {
      console.log("error get user", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        googleAuth,
        getUser,
        user,
        googleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}

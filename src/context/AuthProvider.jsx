import { useState } from "react";
import { AuthContext } from "./AuthContext";

const getUser = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  return {
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    role: localStorage.getItem("role"),
    token,
  };
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);

  const login = (data) => {
    localStorage.setItem("id", data.id);
    localStorage.setItem("email", data.email);
    localStorage.setItem("name", data.name);
    localStorage.setItem("role", data.role);
    localStorage.setItem("token", data.token);

    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    setUser(null);
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
};

export default AuthProvider;

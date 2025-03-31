import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null); // Estado inicial sempre null

  // Carrega o cliente do localStorage apenas na montagem inicial
  useEffect(() => {
    const storedCliente = JSON.parse(localStorage.getItem("cliente"));
    if (storedCliente) {
      setCliente(storedCliente);
    }
  }, []);

  const login = (clienteData) => {
    setCliente(clienteData);
    localStorage.setItem("cliente", JSON.stringify(clienteData));
  };

  const logout = () => {
    setCliente(null);
    localStorage.removeItem("cliente");
  };

  return (
    <AuthContext.Provider value={{ cliente, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

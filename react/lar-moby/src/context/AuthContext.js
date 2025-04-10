import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega o cliente do localStorage na montagem inicial
  useEffect(() => {
    const loadCliente = () => {
      try {
        const storedCliente = JSON.parse(localStorage.getItem("cliente"));
        if (
          storedCliente &&
          typeof storedCliente === "object" &&
          storedCliente.id_cliente
        ) {
          setCliente(storedCliente);
        }
      } catch (error) {
        console.error("Erro ao carregar cliente do localStorage:", error);
        localStorage.removeItem("cliente"); // Remove dados corrompidos
      } finally {
        setIsLoading(false);
      }
    };

    loadCliente();
  }, []);

  const login = (clienteData) => {
    if (!clienteData || !clienteData.id_cliente) {
      throw new Error("Dados de cliente inválidos");
    }
    setCliente(clienteData);
    localStorage.setItem("cliente", JSON.stringify(clienteData));
  };

  const logout = () => {
    try {
      setCliente(null);
      localStorage.removeItem("cliente");
      // Limpar qualquer outro dado relacionado à sessão
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Verificar autenticação com o backend
  const verifyAuth = async () => {
    try {
      const storedCliente = JSON.parse(localStorage.getItem("cliente"));
      if (!storedCliente) {
        setCliente(null);
        return false;
      }

      // Exemplo: Verificar com o backend (descomente e ajuste conforme sua API)
      /*
      const response = await axios.get("http://localhost:8080/clientes/verify", {
        headers: { Authorization: `Bearer ${storedCliente.token}` },
      });
      if (response.status === 200) {
        setCliente(storedCliente);
        return true;
      }
      */
      setCliente(storedCliente);
      return true;
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      logout();
      return false;
    }
  };

  // Valor fornecido pelo contexto
  const value = {
    cliente,
    isLoading,
    login,
    logout,
    verifyAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

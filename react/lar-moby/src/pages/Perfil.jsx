import React from "react";
import { useAuth } from "../context/AuthContext"; // Importa o useAuth

function Perfil() {
  const { cliente } = useAuth(); // Pega o cliente do contexto

  // Verifica se cliente existe, caso contrário, exibe uma mensagem
  if (!cliente) {
    return (
      <div className="min-h-[85vh] bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">Erro: Nenhum usuário logado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Informações da Conta</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Nome</span>
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 text-lg">
                {cliente.nome || "Não informado"}
              </span>
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Email</span>
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 text-lg">{cliente.email}</span>
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Senha</span>
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 text-lg">•••••••••••••</span>
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Telefone</span>
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 text-lg">
                {cliente.telefone || "Não informado"}
              </span>
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;

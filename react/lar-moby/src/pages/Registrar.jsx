import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registrar({ setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nome, setNome] = useState(""); // Adicionado campo para nome
  const [telefone, setTelefone] = useState(""); // Adicionado campo para telefone
  const [registerMessage, setRegisterMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validações locais
    if (!nome || !email || !password || !confirmPassword || !telefone) {
      setRegisterMessage("Todos os campos são obrigatórios!");
      return;
    }
    if (password !== confirmPassword) {
      setRegisterMessage("As senhas não coincidem!");
      return;
    }

    // Dados do cliente para enviar ao backend
    const clienteData = {
      nome,
      email,
      senha: password,
      telefone,
      data_cadastro: new Date().toISOString().split("T")[0], // Data atual no formato YYYY-MM-DD
      data_criacao: new Date().toISOString().split("T")[0], // Data atual no formato YYYY-MM-DD
      status: "ativo",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/clientes/criarcliente",
        clienteData
      );
      setRegisterMessage("Registro realizado com sucesso!");
      setTimeout(() => {
        setShowRegister(false); // Volta para o login após sucesso
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data === "email já cadastrado") {
        setRegisterMessage("Email já cadastrado!");
      } else {
        setRegisterMessage("Erro ao registrar. Tente novamente.");
      }
      console.error("Erro ao registrar cliente:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Criar Conta</h1>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="email@gmail.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Telefone</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirmar Senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Confirme sua senha"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition"
            >
              Registrar
            </button>
          </form>

          {registerMessage && (
            <p
              className={`text-center mt-4 ${
                registerMessage.includes("sucesso")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {registerMessage}
            </p>
          )}

          <div className="text-center mt-4">
            <button
              onClick={() => setShowRegister(false)}
              className="text-yellow-500 hover:underline"
            >
              Voltar para Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrar;
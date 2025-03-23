import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registrar({ setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setRegisterMessage("Todos os campos são obrigatórios!");
    } else if (password !== confirmPassword) {
      setRegisterMessage("As senhas não coincidem!");
    } else {
        setRegisterMessage('Login realizado com sucesso!');
        // Redireciona para a rota raiz após 1 segundo
        setTimeout(() => {
          navigate('/');
        }, 1000);      console.log("Novo usuário:", { email, password });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Criar Conta</h1>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="email@gmail.com"
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
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Confirme sua senha"
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

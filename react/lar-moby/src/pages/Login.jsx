import React, { useState } from "react";
import Registrar from "./Registrar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Importa o useAuth
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Pega a função login do contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, senha: password };
    console.log("Enviando requisição com:", JSON.stringify(loginData, null, 2));
    try {
      const response = await axios.post(
        "http://localhost:8080/clientes/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta do backend:", response.data);
      const cliente = response.data;
      login(cliente); // Atualiza o estado global com o cliente
      Swal.fire({
        title: "Bem-vindo!",
        text: "Login realizado com sucesso!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate("/produtos");
      }, 1500);
    } catch (error) {
      console.error("Erro completo:", error);
      if (error.response) {
        console.log(
          "Resposta do erro:",
          error.response.data,
          error.response.status
        );
        if (error.response.status === 401) {
          Swal.fire({
            title: "Ops!",
            text: "Email ou senha incorretos!",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Erro!",
            text: `Erro no servidor: ${error.response.status}`,
            icon: "error",
          });
        }
      } else if (error.request) {
        Swal.fire({
          title: "Erro de Conexão!",
          text: "Não foi possível conectar ao servidor!",
          icon: "error",
        });
        console.error("Nenhuma resposta recebida:", error.request);
      } else {
        Swal.fire({
          title: "Erro!",
          text: "Erro ao processar login!",
          icon: "error",
        });
        console.error("Erro na requisição:", error.message);
      }
    }
  };

  if (showRegister) {
    return <Registrar setShowRegister={setShowRegister} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            Que bom ter você aqui!
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Entre e aproveite o melhor do LarMoby.
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Informe o E-mail
              </label>
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
              <label className="block text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="!exemplo123"
                required
              />
              <a
                href="#esqueceu_senha"
                className="text-sm text-yellow-500 hover:underline mt-2 block text-right"
              >
                Esqueci minha senha
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition"
            >
              Entrar
            </button>
          </form>

          {loginMessage && (
            <p
              className={`text-center mt-4 ${
                loginMessage.includes("sucesso")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {loginMessage}
            </p>
          )}

          <div className="text-center mt-4">
            <button
              onClick={() => setShowRegister(true)}
              className="text-yellow-500 hover:underline"
            >
              Criar conta LarMoby
            </button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">ou</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 transition">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Entrar com Google
          </button>

          <div className="text-center mt-4">
            <a href="#ajuda" className="text-sm text-gray-500 hover:underline">
              Preciso de ajuda?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

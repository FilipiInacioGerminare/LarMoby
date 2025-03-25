import React, { useState } from "react";
import Registrar from "./Registrar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "inacio@gmail.com" && password === "12344321!i") {
        setLoginMessage('Login realizado com sucesso!');
        // Redireciona para a rota raiz após 1 segundo
        setTimeout(() => {
          navigate('/');
        }, 1000);    } else {
      setLoginMessage("Email ou senha incorretos!");
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
                type="text"
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
                placeholder="!exemplo123"
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

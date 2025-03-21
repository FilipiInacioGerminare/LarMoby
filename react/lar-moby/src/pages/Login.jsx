import React from 'react';

function Login() {
  return (
    <div className="min-h-screen bg-gray-100">
      

      {/* Login Form */}
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            Que bom ter você aqui!
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Entre e aproveite o melhor do LarMoby.
          </p>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Informe o E-mail
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="email@gmail.com"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="!exemplo123"
              />
              <a href="#" className="text-sm text-yellow-500 hover:underline mt-2 block text-right">
                Esqueci minha senha
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition"
            >
              Entrar
            </button>
          </form>

          {/* Create Account Link */}
          <div className="text-center mt-4">
            <a href="#" className="text-yellow-500 hover:underline">
              Criar conta Centauro
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">ou</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login Button */}
          <button
            className="w-full flex items-center justify-center p-3 border rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Entrar com Google
          </button>

          {/* Help Link */}
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Preciso de ajuda?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
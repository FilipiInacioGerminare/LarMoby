import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Carrinho() {
  const [cartItems, setCartItems] = useState([]);
  const [cep, setCep] = useState("05116-001");
  const { cliente } = useAuth();
  const idCliente = cliente ? cliente.id_cliente : null;

  useEffect(() => {
    if (!idCliente) {
      setCartItems([]);
      return;
    }

    // Carregar itens do localStorage com chave específica por cliente
    const cartKey = `cartItems_${idCliente}`;
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [idCliente]);

  const removeFromCart = (id) => {
    const cartKey = `cartItems_${idCliente}`;
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, delta) => {
    const cartKey = `cartItems_${idCliente}`;
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const novaQuantidade = item.quantity + delta;
          if (novaQuantidade <= 0) {
            return null;
          }
          return {
            ...item,
            quantity: novaQuantidade,
            subtotal: novaQuantidade * item.price,
          };
        }
        return item;
      })
      .filter((item) => item !== null);

    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;

  if (!idCliente) {
    return (
      <div className="min-h-screen container flex mx-auto px-4 py-6 text-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">
            Faça login para ver seu carrinho
          </h2>
          <Link
            to="/login"
            className="border border-[#EBC351] text-[#EBC351] px-4 py-2 rounded"
          >
            Fazer login
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen container flex mx-auto px-4 py-6 text-center justify-center">
        <div className="flex flex-col items-center">
          <svg
            className="w-12 h-12 text-gray-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-xl font-bold mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-4">
            Que tal explorar nossos produtos em destaque?
          </p>
          <Link
            to="/produtos"
            className="border border-[#EBC351] text-[#EBC351] px-4 py-2 rounded"
          >
            Explorar produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Meu carrinho</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-start"
            >
              <img
                src={item.imagem_url}
                alt={item.nome}
                className="w-24 h-24 object-cover mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-bold">{item.nome}</h2>
                    <p className="text-sm text-gray-600">Ref: #{item.id}</p>
                    <p className="text-sm text-gray-600">{item.descricao}</p>
                    <p className="text-sm text-gray-600">
                      Vendido por{" "}
                      <span className="text-[#EBC351]">LarMoby</span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Preço unitário: R$
                      {item.price ? item.price.toFixed(2) : "0.00"}
                    </p>
                    <p className="font-bold">
                      Subtotal: R$
                      {item.subtotal ? item.subtotal.toFixed(2) : "0.00"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">
              Consultar frete e prazo de entrega
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="CEP"
                className="border rounded px-3 py-2 w-32"
              />
              <button className="bg-[#EBC351] text-white px-4 py-2 rounded">
                Consultar
              </button>
              <a href="#cep" className="text-[#EBC351] text-sm">
                Não sei meu CEP
              </a>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-4">Resumo da compra</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal ({cartItems.length} item)</span>
              <span>R${subtotal ? subtotal.toFixed(2) : "0.00"}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Frete Grátis</span>
              <span className="text-green-600">Grátis</span>
            </div>
            <div className="flex justify-between mb-2 font-bold">
              <span>Valor total</span>
              <span>R${total ? total.toFixed(2) : "0.00"}</span>
            </div>
            <button className="bg-purple-600 text-white w-full py-2 rounded">
              Finalizar
            </button>
            <Link
              to="/produtos"
              className="border border-[#EBC351] w-full py-2 rounded mt-2 block text-center"
            >
              Escolher mais produtos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;

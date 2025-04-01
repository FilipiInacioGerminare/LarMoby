import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Carrinho() {
  const [cartItems, setCartItems] = useState([]);
  const [cep, setCep] = useState("05116-001");
  const { cliente } = useAuth();
  const idCliente = cliente ? cliente.id_cliente : null;

  const getOrCreateCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/carrinhos/criar/${idCliente}`
      );
      return response.data.id_carrinho;
    } catch (error) {
      console.error("Erro ao criar/obter carrinho:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!idCliente) {
        setCartItems([]);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/carrinhos/cliente/${idCliente}`
        );

        if (!response.data || response.data.length === 0) {
          setCartItems([]);
          return;
        }

        const itemsWithDetails = await Promise.all(
          response.data.map(async (item) => {
            try {
              const produtoResponse = await axios.get(
                `http://localhost:8080/produtos/${item.id_produto}`
              );
              return {
                id: item.id_produto,
                name: produtoResponse.data.nome,
                price: produtoResponse.data.preco,
                quantity: item.quantidade,
                image: produtoResponse.data.imagem_url,
                subtotal: item.subtotal,
              };
            } catch (error) {
              console.error(
                `Erro ao buscar produto ${item.id_produto}:`,
                error
              );
              return null;
            }
          })
        );

        setCartItems(itemsWithDetails.filter((item) => item !== null));
      } catch (error) {
        console.error("Erro ao buscar itens do carrinho:", error);
        setCartItems([]);
      }
    };

    fetchCartItems();
  }, [idCliente]);

  const removeFromCart = async (id) => {
    if (!idCliente) return;

    try {
      const idCarrinho = await getOrCreateCart();
      await axios.delete("http://localhost:8080/carrinhos/removerproduto", {
        params: { idCarrinho, idProduto: id },
      });
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      alert("Erro ao remover produto do carrinho.");
    }
  };

  const updateQuantity = async (id, delta) => {
    if (!idCliente) return;

    const item = cartItems.find((i) => i.id === id);
    const novaQuantidade = item.quantity + delta;

    try {
      const idCarrinho = await getOrCreateCart();
      if (novaQuantidade <= 0) {
        await removeFromCart(id);
        return;
      }

      await axios.put(
        "http://localhost:8080/carrinhos/atualizarquantidade",
        null,
        {
          params: { idCarrinho, idProduto: id, novaQuantidade },
        }
      );
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: novaQuantidade } : item
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
      alert("Erro ao atualizar quantidade.");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;

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
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-sm text-gray-600">Ref: #{item.id}</p>
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
                <div className="flex items-center mt-2">
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
              <span>R${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Frete Grátis</span>
              <span className="text-green-600">Grátis</span>
            </div>
            <div className="flex justify-between mb-2 font-bold">
              <span>Valor total</span>
              <span>R${total.toFixed(2)}</span>
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

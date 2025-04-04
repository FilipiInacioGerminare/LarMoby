import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

function FinalizarCompra() {
  const [cartItems, setCartItems] = useState([]);
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [loading, setLoading] = useState(false);
  const { cliente } = useAuth();
  const idCliente = cliente ? cliente.id_cliente : null;
  const location = useLocation();
  const navigate = useNavigate();
  const { endereco, frete } = location.state || {};

  useEffect(() => {
    if (!idCliente) {
      navigate("/login");
      return;
    }

    if (!endereco) {
      navigate("/carrinho");
      return;
    }

    // Carregar itens do carrinho do localStorage
    const cartKey = `cartItems_${idCliente}`;
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [idCliente, endereco, navigate]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + frete;

  const finalizarPedido = async () => {
    if (!numero) {
      Swal.fire({
        title: "Atenção!",
        text: "Por favor, informe o número do endereço.",
        icon: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      // Aqui você pode implementar a lógica para salvar o pedido no backend
      // Por enquanto, vamos apenas simular um sucesso
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Limpar o carrinho
      localStorage.removeItem(`cartItems_${idCliente}`);

      Swal.fire({
        title: "Sucesso!",
        text: "Seu pedido foi finalizado com sucesso!",
        icon: "success",
      }).then(() => {
        navigate("/produtos");
      });
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível finalizar seu pedido. Tente novamente.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!endereco || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="container min-h-screen mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Finalizar compra</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-4">Endereço de entrega</h2>
            <div className="mb-4">
              <p>{endereco.logradouro}</p>
              <p>{endereco.bairro}</p>
              <p>
                {endereco.localidade} - {endereco.uf}
              </p>
              <p>CEP: {endereco.cep}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número*
                </label>
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Apto, Bloco, etc."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-4">Produtos</h2>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex items-center">
                  <img
                    src={item.imagem_url}
                    alt={item.nome}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{item.nome}</h3>
                    <p className="text-sm text-gray-600">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-4">Resumo do pedido</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} item)</span>
                <span>R${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>R${frete.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>R${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={finalizarPedido}
              disabled={loading}
              className="bg-purple-600 text-white w-full py-2 rounded disabled:opacity-50"
            >
              {loading ? "Finalizando..." : "Confirmar pedido"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalizarCompra;

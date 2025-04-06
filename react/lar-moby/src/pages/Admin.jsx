import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [activeTab, setActiveTab] = useState("produtos");
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [clienteEmEdicao, setClienteEmEdicao] = useState(null);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem_url: "",
    destaque: false,
    qnt_estoque: "",
    id_categoria: "",
  });
  const [novaCategoria, setNovaCategoria] = useState({ nome: "" });
  const { cliente, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!cliente || !cliente.admin) {
      navigate("/home");
      return;
    }

    const fetchData = async () => {
      try {
        const [produtosRes, categoriasRes, clientesRes, pedidosRes] =
          await Promise.all([
            axios.get("http://localhost:8080/produtos"),
            axios.get("http://localhost:8080/categorias"),
            axios.get("http://localhost:8080/clientes"),
            axios.get("http://localhost:8080/pedidos"),
          ]);

        setProdutos(produtosRes.data);
        setCategorias(categoriasRes.data);
        setClientes(clientesRes.data);
        setPedidos(pedidosRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [cliente, isLoading, navigate]);

  const handleSubmitProduto = async (e) => {
    e.preventDefault();
    try {
      const produtoParaEnviar = {
        ...novoProduto,
        preco: novoProduto.preco ? parseFloat(novoProduto.preco) : 0,
      };

      await axios.post(
        "http://localhost:8080/produtos/inserir",
        produtoParaEnviar
      );
      setNovoProduto({
        nome: "",
        descricao: "",
        preco: "",
        imagem_url: "",
        destaque: false,
        qnt_estoque: "",
        id_categoria: "",
      });
      const response = await axios.get("http://localhost:8080/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleSubmitCategoria = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/categorias/inserir",
        novaCategoria
      );
      setNovaCategoria({ nome: "" });
      const response = await axios.get("http://localhost:8080/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  const handleDeleteCategoria = async (idCategoria) => {
    try {
      await axios.delete(
        `http://localhost:8080/categorias/deletar/${idCategoria}`
      );
      const response = await axios.get("http://localhost:8080/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };

  const handleDeleteProduto = async (idProduto) => {
    try {
      await axios.delete(`http://localhost:8080/produtos/deletar/${idProduto}`);
      const response = await axios.get("http://localhost:8080/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const toggleAdminStatus = async (idCliente) => {
    try {
      await axios.put(
        `http://localhost:8080/clientes/toggleadmin/${idCliente}`
      );
      const response = await axios.get("http://localhost:8080/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao alterar status de admin:", error);
    }
  };

  const handleUpdateCliente = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/clientes/atualizar/${clienteEmEdicao.id_cliente}`,
        clienteEmEdicao
      );
      const response = await axios.get("http://localhost:8080/clientes");
      setClientes(response.data);
      setClienteEmEdicao(null);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("produtos")}
          className={`px-4 py-2 rounded ${
            activeTab === "produtos"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Produtos
        </button>
        <button
          onClick={() => setActiveTab("categorias")}
          className={`px-4 py-2 rounded ${
            activeTab === "categorias"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Categorias
        </button>
        <button
          onClick={() => setActiveTab("clientes")}
          className={`px-4 py-2 rounded ${
            activeTab === "clientes"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Clientes
        </button>
        <button
          onClick={() => setActiveTab("vendas")}
          className={`px-4 py-2 rounded ${
            activeTab === "vendas" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          Histórico de Vendas
        </button>
      </div>

      {activeTab === "produtos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Adicionar Novo Produto</h2>
            <form onSubmit={handleSubmitProduto} className="space-y-4">
              <input
                type="text"
                placeholder="Nome do produto"
                value={novoProduto.nome}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, nome: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Descrição"
                value={novoProduto.descricao}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, descricao: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Preço"
                value={novoProduto.preco}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, preco: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="URL da imagem"
                value={novoProduto.imagem_url}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, imagem_url: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Quantidade em estoque"
                value={novoProduto.qnt_estoque}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    qnt_estoque: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
              <select
                value={novoProduto.id_categoria}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    id_categoria: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.id_categoria}
                    value={categoria.id_categoria}
                  >
                    {categoria.nome}
                  </option>
                ))}
              </select>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={novoProduto.destaque}
                  onChange={(e) =>
                    setNovoProduto({
                      ...novoProduto,
                      destaque: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label>Produto em destaque</label>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white p-2 rounded"
              >
                Adicionar Produto
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Lista de Produtos</h2>
            <div className="space-y-4">
              {produtos.map((produto) => (
                <div
                  key={produto.id_produto}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{produto.nome}</h3>
                    <p className="text-sm text-gray-600">
                      R$ {produto.preco ? produto.preco.toFixed(2) : "0.00"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Estoque: {produto.qnt_estoque}
                    </span>
                    <button
                      onClick={() => handleDeleteProduto(produto.id_produto)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "categorias" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Adicionar Nova Categoria</h2>
            <form onSubmit={handleSubmitCategoria} className="space-y-4">
              <input
                type="text"
                placeholder="Nome da categoria"
                value={novaCategoria.nome}
                onChange={(e) =>
                  setNovaCategoria({ ...novaCategoria, nome: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white p-2 rounded"
              >
                Adicionar Categoria
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Lista de Categorias</h2>
            <div className="space-y-4">
              {categorias.map((categoria) => (
                <div
                  key={categoria.id_categoria}
                  className="border p-4 rounded"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{categoria.nome}</h3>
                    <button
                      onClick={() =>
                        handleDeleteCategoria(categoria.id_categoria)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "clientes" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Lista de Clientes</h2>
          <div className="space-y-4">
            {clientes.map((cliente) => (
              <div
                key={cliente.id_cliente}
                className="border p-4 rounded flex justify-between items-center"
              >
                {clienteEmEdicao &&
                clienteEmEdicao.id_cliente === cliente.id_cliente ? (
                  <form
                    onSubmit={handleUpdateCliente}
                    className="w-full space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nome"
                        value={clienteEmEdicao.nome}
                        onChange={(e) =>
                          setClienteEmEdicao({
                            ...clienteEmEdicao,
                            nome: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={clienteEmEdicao.email}
                        onChange={(e) =>
                          setClienteEmEdicao({
                            ...clienteEmEdicao,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="tel"
                        placeholder="Telefone"
                        value={clienteEmEdicao.telefone || ""}
                        onChange={(e) =>
                          setClienteEmEdicao({
                            ...clienteEmEdicao,
                            telefone: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                      <select
                        value={clienteEmEdicao.status || ""}
                        onChange={(e) =>
                          setClienteEmEdicao({
                            ...clienteEmEdicao,
                            status: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Selecione o status</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                      </select>
                      <input
                        type="password"
                        placeholder="Nova senha (deixe em branco para manter a atual)"
                        onChange={(e) =>
                          setClienteEmEdicao({
                            ...clienteEmEdicao,
                            senha: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setClienteEmEdicao(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div>
                      <h3 className="font-bold">{cliente.nome}</h3>
                      <p className="text-sm text-gray-600">{cliente.email}</p>
                      {cliente.telefone && (
                        <p className="text-sm text-gray-600">
                          Tel: {cliente.telefone}
                        </p>
                      )}
                      {cliente.status && (
                        <p className="text-sm text-gray-600">
                          Status: {cliente.status}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          cliente.admin
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {cliente.admin ? "Admin" : "Usuário"}
                      </span>
                      <button
                        onClick={() => setClienteEmEdicao(cliente)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => toggleAdminStatus(cliente.id_cliente)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        {cliente.admin ? "Remover Admin" : "Tornar Admin"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "vendas" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Histórico de Vendas</h2>
          <div className="space-y-4">
            {pedidos.length === 0 ? (
              <p className="text-center text-gray-600">
                Nenhum pedido encontrado.
              </p>
            ) : (
              pedidos.map((pedido) => {
                const clientePedido = clientes.find(
                  (c) => c.id_cliente === pedido.id_cliente
                );
                const nomeCliente = clientePedido
                  ? clientePedido.nome
                  : "Cliente desconhecido";

                return (
                  <div key={pedido.id_pedido} className="border p-4 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">Pedido #{pedido.id_pedido}</h3>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          pedido.status === "pendente"
                            ? "bg-yellow-100 text-yellow-800"
                            : pedido.status === "concluído"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {pedido.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-semibold">Cliente:</p>
                        <p>{nomeCliente}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Data:</p>
                        <p>
                          {new Date(pedido.data_pedido).toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Total:</p>
                        <p>R$ {pedido.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Admin() {
  const [activeTab, setActiveTab] = useState("produtos");
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [newProduto, setNewProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem_url: "",
    qnt_estoque: "",
    id_categoria: "",
  });
  const [newCategoria, setNewCategoria] = useState({ nome: "" });
  const [message, setMessage] = useState("");
  const { cliente } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [produtosRes, categoriasRes, clientesRes] = await Promise.all([
        axios.get("http://localhost:8080/produtos"),
        axios.get("http://localhost:8080/categorias"),
        axios.get("http://localhost:8080/clientes"),
      ]);
      setProdutos(produtosRes.data);
      setCategorias(categoriasRes.data);
      setClientes(clientesRes.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setMessage("Erro ao carregar dados");
    }
  };

  const handleSubmitProduto = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/produtos", newProduto);
      setMessage("Produto adicionado com sucesso!");
      setNewProduto({
        nome: "",
        descricao: "",
        preco: "",
        imagem_url: "",
        qnt_estoque: "",
        id_categoria: "",
      });
      fetchData();
    } catch (error) {
      setMessage("Erro ao adicionar produto");
    }
  };

  const handleSubmitCategoria = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/categorias", newCategoria);
      setMessage("Categoria adicionada com sucesso!");
      setNewCategoria({ nome: "" });
      fetchData();
    } catch (error) {
      setMessage("Erro ao adicionar categoria");
    }
  };

  const handleToggleAdmin = async (idCliente) => {
    try {
      await axios.put(
        `http://localhost:8080/clientes/toggleadmin/${idCliente}`
      );
      setMessage("Status de admin atualizado com sucesso!");
      fetchData();
    } catch (error) {
      setMessage("Erro ao atualizar status de admin");
    }
  };

  const handleDeleteProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await axios.delete(`http://localhost:8080/produtos/${id}`);
        setMessage("Produto deletado com sucesso!");
        fetchData();
      } catch (error) {
        setMessage("Erro ao deletar produto");
      }
    }
  };

  const handleDeleteCategoria = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta categoria?")) {
      try {
        await axios.delete(`http://localhost:8080/categorias/${id}`);
        setMessage("Categoria deletada com sucesso!");
        fetchData();
      } catch (error) {
        setMessage("Erro ao deletar categoria");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

      {message && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

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
      </div>

      {activeTab === "produtos" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Gerenciar Produtos</h2>
          <form onSubmit={handleSubmitProduto} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome do produto"
                value={newProduto.nome}
                onChange={(e) =>
                  setNewProduto({ ...newProduto, nome: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Descrição"
                value={newProduto.descricao}
                onChange={(e) =>
                  setNewProduto({ ...newProduto, descricao: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Preço"
                value={newProduto.preco}
                onChange={(e) =>
                  setNewProduto({ ...newProduto, preco: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="URL da imagem"
                value={newProduto.imagem_url}
                onChange={(e) =>
                  setNewProduto({ ...newProduto, imagem_url: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Quantidade em estoque"
                value={newProduto.qnt_estoque}
                onChange={(e) =>
                  setNewProduto({ ...newProduto, qnt_estoque: e.target.value })
                }
                className="border p-2 rounded"
              />
              <select
                value={newProduto.id_categoria}
                onChange={(e) =>
                  setNewProduto({ ...newProduto, id_categoria: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Adicionar Produto
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtos.map((produto) => (
              <div
                key={produto.id_produto}
                className="border p-4 rounded shadow"
              >
                <img
                  src={produto.imagem_url}
                  alt={produto.nome}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-bold">{produto.nome}</h3>
                <p className="text-gray-600">{produto.descricao}</p>
                <p className="font-bold mt-2">R$ {produto.preco}</p>
                <p>Estoque: {produto.qnt_estoque}</p>
                <button
                  onClick={() => handleDeleteProduto(produto.id_produto)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "categorias" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Gerenciar Categorias</h2>
          <form onSubmit={handleSubmitCategoria} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Nome da categoria"
                value={newCategoria.nome}
                onChange={(e) =>
                  setNewCategoria({ ...newCategoria, nome: e.target.value })
                }
                className="border p-2 rounded flex-grow"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Adicionar Categoria
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorias.map((categoria) => (
              <div
                key={categoria.id_categoria}
                className="border p-4 rounded shadow"
              >
                <h3 className="font-bold">{categoria.nome}</h3>
                <button
                  onClick={() => handleDeleteCategoria(categoria.id_categoria)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "clientes" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Gerenciar Clientes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left">Nome</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Admin</th>
                  <th className="px-6 py-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id_cliente} className="border-b">
                    <td className="px-6 py-4">{cliente.nome}</td>
                    <td className="px-6 py-4">{cliente.email}</td>
                    <td className="px-6 py-4">{cliente.status}</td>
                    <td className="px-6 py-4">
                      {cliente.admin ? "Sim" : "Não"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleAdmin(cliente.id_cliente)}
                        className={`px-4 py-2 rounded ${
                          cliente.admin ? "bg-red-500" : "bg-green-500"
                        } text-white`}
                      >
                        {cliente.admin ? "Remover Admin" : "Tornar Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

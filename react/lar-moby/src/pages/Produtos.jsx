import React, { useState, useEffect } from "react";
import Filtro from "../assets/Slider.png";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Produtos({ searchCategory = "" }) {
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { cliente } = useAuth();
  const idCliente = cliente ? cliente.id_cliente : null;

  // Buscar produtos do backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/produtos");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        alert("Erro ao carregar produtos. Tente novamente.");
      }
    };
    fetchProducts();
  }, []);

  // Adicionar ao carrinho
  const addToCart = async (product) => {
    if (!idCliente) {
      alert("Faça login para adicionar produtos ao carrinho!");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/carrinhos/adicionarproduto`,
        null,
        {
          params: {
            idCarrinho: idCliente,
            idProduto: product.id_produto,
          },
        }
      );
      alert("Produto adicionado ao carrinho com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("Erro ao adicionar ao carrinho.");
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  let filteredProducts = [...products];

  if (searchCategory) {
    filteredProducts = filteredProducts.filter((product) =>
      product.id_categoria?.nome
        ?.toLowerCase()
        .includes(searchCategory.toLowerCase())
    );
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.id_categoria?.nome &&
        selectedCategories.includes(product.id_categoria.nome)
    );
  }

  if (sortOrder === "cheapest") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.preco - b.preco);
  } else if (sortOrder === "mostExpensive") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.preco - a.preco);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-4">
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-xl p-10"
          >
            <img src={Filtro} alt="Filtrar" />
          </button>
          {showFilters && (
            <div className="absolute left-0 mb-2 w-80 bg-white p-6 rounded-lg shadow-lg z-10">
              <h2 className="text-lg font-bold mb-4 text-gray-800">
                Filtre por:
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cheapest"
                    checked={sortOrder === "cheapest"}
                    onChange={() =>
                      setSortOrder(sortOrder === "cheapest" ? "" : "cheapest")
                    }
                    className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label htmlFor="cheapest" className="text-sm text-gray-700">
                    Mais baratos
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mostExpensive"
                    checked={sortOrder === "mostExpensive"}
                    onChange={() =>
                      setSortOrder(
                        sortOrder === "mostExpensive" ? "" : "mostExpensive"
                      )
                    }
                    className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="mostExpensive"
                    className="text-sm text-gray-700"
                  >
                    Mais caros
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="salaDeJantar"
                    checked={selectedCategories.includes("Sala de jantar")}
                    onChange={() => handleCategoryChange("Sala de jantar")}
                    className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="salaDeJantar"
                    className="text-sm text-gray-700"
                  >
                    Móveis para sala de jantar
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cozinha"
                    checked={selectedCategories.includes("Cozinha")}
                    onChange={() => handleCategoryChange("Cozinha")}
                    className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label htmlFor="cozinha" className="text-sm text-gray-700">
                    Móveis para cozinha
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="banheiro"
                    checked={selectedCategories.includes("Banheiro")}
                    onChange={() => handleCategoryChange("Banheiro")}
                    className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label htmlFor="banheiro" className="text-sm text-gray-700">
                    Móveis para banheiro
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="areaExterna"
                    checked={selectedCategories.includes("Área externa")}
                    onChange={() => handleCategoryChange("Área externa")}
                    className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="areaExterna"
                    className="text-sm text-gray-700"
                  >
                    Móveis para área externa
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  className="bg-[#EBC351] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#D78700] transition-colors"
                  onClick={() => setShowFilters(false)}
                >
                  Filtrar
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    setShowFilters(false);
                    setSortOrder("");
                    setSelectedCategories([]);
                  }}
                >
                  Limpar
                </button>
              </div>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold">
          {searchCategory ? searchCategory : "Todos os Produtos"}
        </h1>
      </div>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">
          Nenhum produto encontrado para a categoria "{searchCategory}".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id_produto}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.imagem_url}
                alt={product.nome}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-2">{product.nome}</p>
                <p className="text-lg font-bold text-gray-900 mb-1">
                  R${product.preco.toFixed(2)} no pix
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Estoque: {product.qnt_estoque}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Produtos;

import React, { useState, useContext } from "react";
import { CartContext } from "../components/CartContext";
import Filtro from "../assets/Slider.png";
import Image from "../assets/sala_estar.png";

function Produtos({ searchCategory = "" }) {
  const { addToCart } = useContext(CartContext);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const products = [
    {
      id: 1,
      image: Image,
      name: "Rack para sala de madeira lisa e tratada",
      price: 1499.9,
      discount: "ou 3x de 359,99",
      shipping: "opção de frete grátis disponível",
      categoria: "Sala de estar",
    },
    {
      id: 2,
      image: Image,
      name: "Mesa de jantar 6 lugares",
      price: 2499.9,
      discount: "ou 3x de 833,30",
      shipping: "opção de frete grátis disponível",
      categoria: "Sala de jantar",
    },
    {
      id: 3,
      image: Image,
      name: "Armário de cozinha modular",
      price: 1999.9,
      discount: "ou 3x de 666,63",
      shipping: "opção de frete grátis disponível",
      categoria: "Cozinha",
    },
    {
      id: 4,
      image: Image,
      name: "Bancada para banheiro",
      price: 899.9,
      discount: "ou 3x de 299,97",
      shipping: "opção de frete grátis disponível",
      categoria: "Banheiro",
    },
    {
      id: 5,
      image: Image,
      name: "Mesa de jardim com cadeiras",
      price: 1799.9,
      discount: "ou 3x de 599,97",
      shipping: "opção de frete grátis disponível",
      categoria: "Área externa",
    },
    {
      id: 6,
      image: Image,
      name: "Sofá para sala de estar",
      price: 2999.9,
      discount: "ou 3x de 999,97",
      shipping: "opção de frete grátis disponível",
      categoria: "Sala de estar",
    },
    {
      id: 7,
      image: Image,
      name: "Cômoda para quarto",
      price: 1299.9,
      discount: "ou 3x de 433,30",
      shipping: "opção de frete grátis disponível",
      categoria: "Quarto",
    },
    {
      id: 8,
      image: Image,
      name: "Prateleira para escritório",
      price: 599.9,
      discount: "ou 3x de 199,97",
      shipping: "opção de frete grátis disponível",
      categoria: "Escritório",
    },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  let filteredProducts = products;

  if (searchCategory) {
    filteredProducts = filteredProducts.filter((product) =>
      product.categoria.toLowerCase().includes(searchCategory.toLowerCase())
    );
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedCategories.includes(product.categoria)
    );
  }

  if (sortOrder === "cheapest") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "mostExpensive") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-4">
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)} // Toggle the pop-up
            className="text-xl p-10"
          >
            <img src={Filtro} alt="Filtrar" />
          </button>

          {/* Position the pop-up above the filter button */}
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
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-2">{product.name}</p>
                <p className="text-lg font-bold text-gray-900 mb-1">
                  R${product.price.toFixed(2)} no pix
                </p>
                <p className="text-sm text-gray-600 mb-1">{product.discount}</p>
                <p className="text-xs font-bold text-green-600">
                  {product.shipping}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Categoria: {product.categoria}
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

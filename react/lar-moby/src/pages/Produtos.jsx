import React, { useState } from "react";
import Filtro from "../assets/Slider.png";

function Produtos() {
  const [showFilters, setShowFilters] = useState(false);

  const products = Array(8).fill({
    id: 1,
    image: "https://via.placeholder.com/200",
    name: "hack para sala de madeira lisa e tratada",
    price: "R$ 1499,90",
    discount: "ou 3x de 359,99",
    shipping: "opção de frete grátis disponível",
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-4">
        <button onClick={() => setShowFilters(true)} className="text-xl p-10">
          <img src={Filtro} alt="Filtrar" />
        </button>
        <h1 className="text-2xl font-bold ">Produtos</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
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
                {product.price} no pix
              </p>
              <p className="text-sm text-gray-600 mb-1">{product.discount}</p>
              <p className="text-xs font-bold text-green-600">
                {product.shipping}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showFilters && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#EBC351] p-6 rounded-lg w-64">
            <h2 className="text-lg font-bold mb-4">Filtre por:</h2>
            <ul className="text-sm">
              <li>
                <input type="checkbox" /> mais baratos
              </li>
              <li>
                <input type="checkbox" /> Mais caros
              </li>
              <li>
                <input type="checkbox" /> Móveis para sala de jantar
              </li>
              <li>
                <input type="checkbox" /> Móveis para cozinha
              </li>
              <li>
                <input type="checkbox" /> Móveis para banheiro
              </li>
              <li>
                <input type="checkbox" /> Móveis para área externa
              </li>
            </ul>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-[#D78700] text-white px-4 py-2 rounded"
                onClick={() => setShowFilters(false)}
              >
                Filtrar
              </button>
              <button
                className="text-black"
                onClick={() => setShowFilters(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Produtos;

import React from "react";
import { useLocation } from "react-router-dom";
import Produtos from "../pages/Produtos";

function Procurar() {
  const location = useLocation();
  const searchCategory = location.state?.searchTerm || ""; // Termo de busca para filtrar produtos por nome

  return (
    <div className="container mx-auto px-4 py-6">
      <Produtos searchCategory={searchCategory} />
    </div>
  );
}

export default Procurar;

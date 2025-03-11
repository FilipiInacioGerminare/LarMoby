import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import React from "react";
// import Footer from "./components/Navbar/Footer";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

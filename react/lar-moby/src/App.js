// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Navbar from "./components/Navbar";
import Carrinho from "./pages/Carrinho";
import { CartProvider } from "./components/CartContext";
import Login from "./pages/Login"

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/perfil" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
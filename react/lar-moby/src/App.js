import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carrinho from "./pages/Carrinho";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/carrinho" element={<Carrinho />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

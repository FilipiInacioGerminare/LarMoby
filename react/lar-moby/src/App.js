import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./components/CartContext";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import Buscar from "./pages/Search";
import Perfil from "./pages/Perfil";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";

// Componente de layout para páginas com Navbar
const LayoutWithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Página de Login sem Navbar */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* Páginas com Navbar */}
            <Route
              path="/home"
              element={
                <LayoutWithNavbar>
                  <Home />
                </LayoutWithNavbar>
              }
            />
            <Route
              path="/admin"
              element={
                <LayoutWithNavbar>
                  <Admin />
                </LayoutWithNavbar>
              }
            />
            <Route
              path="/produtos"
              element={
                <LayoutWithNavbar>
                  <Produtos />
                </LayoutWithNavbar>
              }
            />
            <Route
              path="/busca"
              element={
                <LayoutWithNavbar>
                  <Buscar />
                </LayoutWithNavbar>
              }
            />
            <Route
              path="/carrinho"
              element={
                <ProtectedRoute>
                  <LayoutWithNavbar>
                    <Carrinho />
                  </LayoutWithNavbar>
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <LayoutWithNavbar>
                    <Perfil />
                  </LayoutWithNavbar>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

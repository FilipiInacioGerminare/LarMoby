import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import Logo from "../assets/Sofa With Buttons.png";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    navigate("/busca", { state: { searchTerm } });
    setSearchTerm("");
  };

  return (
    <nav className="bg-[#EBC351] p-4 shadow-md text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          to="/"
          className="text-4xl md:text-3xl flex items-center font-bagel mb-4 md:mb-0"
        >
          Lar
          <span className="mx-1 w-7 md:w-6">
            <img src={Logo} alt="" className="w-full h-auto" />
          </span>
          Moby
        </Link>

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link to="/" className="hover:underline">
              home
            </Link>
            <Link to="/produtos" className="hover:underline">
              produtos
            </Link>
          </div>

          <div className="flex space-x-4 mt-2 md:mt-0 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="O que você está procurando?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="w-64 md:w-80 h-10 pl-4 pr-10 rounded-full focus:outline-none text-black"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <FaSearch className="text-[#EBC351]  text-lg" />
              </button>
            </div>

            <Link to="/carrinho">
              <FaShoppingCart className="text-xl md:text-2xl" />
            </Link>
            <Link to="/login">
              <FaUser className="text-xl md:text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
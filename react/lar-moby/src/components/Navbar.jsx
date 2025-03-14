// Navbar.js
import { Link } from "react-router-dom";
import Logo from "../assets/Sofa With Buttons.png";

function Navbar() {
  return (
    <nav className="bg-yellow-500 p-4 shadow-md ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold flex">
          Lar
          <img src={Logo} alt="parte da logo" className="w-6" />
          Moby
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/produtos" className="text-white hover:underline">
            Produtos
          </Link>
          <Link to="/carrinho" className="text-white hover:underline">
            Carrinho
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

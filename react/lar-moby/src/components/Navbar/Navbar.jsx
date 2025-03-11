import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import Logo from "../../assets/Sofa With Buttons.png"

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-yellow-500 px-6 py-3 flex justify-between items-center">
      <div className="text-white font-bold text-lg flex items-center">
        <span className="text-2xl">Lar</span>
        <span className="mx-1">
          <img src={Logo} alt="icon" className="h-6 inline-block" />
        </span>
        <span className="text-2xl">Moby</span>
      </div>
      <div className="flex space-x-6 text-white font-medium">
        <Link
          to="/"
          className={`hover:underline ${location.pathname === "/" ? "underline" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/produtos"
          className={`hover:underline ${location.pathname === "/produtos" ? "underline" : ""}`}
        >
          Produtos
        </Link>
        <Link
          to="/sobre"
          className={`hover:underline ${location.pathname === "/sobre" ? "underline" : ""}`}
        >
          Sobre a empresa
        </Link>
        <FaSearch className="cursor-pointer" />
        <Link>
            <FaShoppingCart
          className={`hover:backdrop-blur-sm cursor-pointer ${location.pathname === "/carrinho" ? "blackdrop-blur-sm" : ""}`} />
        </Link>
        <FaUser className="cursor-pointer" />
      </div>
    </nav>
  );
}

export default Navbar;
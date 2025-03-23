import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import Logo from "../assets/Sofa With Buttons.png";

function Navbar() {
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

          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/busca">
              <FaSearch className="text-xl md:text-2xl" />
            </Link>
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

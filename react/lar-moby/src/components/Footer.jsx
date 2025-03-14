import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../assets/Sofa With Buttons.png";

function Footer() {
  return (
    <footer className="bg-yellow-500 text-white py-4 text-center">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Brand Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold flex items-center">
            <span className="mr-2">Lar</span>
            <span className="text-2xl">
              <img src={Logo} alt="Parte da logo" className="w-6" />
            </span>
            <span className="ml-2">Moby</span>
          </h3>
          <p className="text-sm">
            Rua Exemplo, 123 - Bairro Exemplo, Cidade - SP | CNPJ:
            12.345.678/0001-90
          </p>
        </div>

        {/* Social Media Section */}
        <div className="mb-4 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Siga nossas redes</h4>
          <div className="flex justify-center space-x-4">
            <a href="#ee" className="hover:text-gray-300">
              <FaFacebookF size={20} />
            </a>
            <a href="#e" className="hover:text-gray-300">
              <FaTwitter size={20} />
            </a>
            <a href="#e" className="hover:text-gray-300">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Nossos contatos</h4>
          <p className="text-sm">📞 (11) 1234-5678</p>
          <p className="text-sm">✉️ sac@larmoby.com</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 border-t border-white pt-2">
        <p className="text-xs">
          Copyright © 2025 LarMoby - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;

import {
  FaFacebookF,
  FaTiktok,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import Logo from "../assets/Sofa With Buttons.png";
import Whats from "../assets/whatsapp.png";
import Email from "../assets/icon_email.png";

function Footer() {
  return (
    <footer className="bg-yellow-400 text-black py-6 text-center">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 mt-6 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center font-bagel">
            <span className="mr-1">Lar</span>
            <span className="text-2xl">
              <img src={Logo} alt="Parte da logo" className="w-8 md:w-10" />
            </span>
            <span className="ml-1">Moby</span>
          </h1>
          <p className="text-sm md:text-base mt-2">
            Sua casa, seu estilo, nosso cuidado.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:border-r-2 border-black p-4 md:p-5">
            <h4 className="text-base md:text-lg font-semibold mb-2 font-albert">
              Siga nossas redes!
            </h4>
            <div className="flex justify-center space-x-4 gap-2">
              <a href="#facebook" className="hover:text-gray-500">
                <FaFacebookF size={18} className="md:size-7" />
              </a>
              <a href="#tiktok" className="hover:text-gray-500">
                <FaTiktok size={18} className="md:size-7" />
              </a>
              <a href="#tiktok" className="hover:text-gray-500">
                <FaPinterest size={18} className="md:size-7" />
              </a>
              <a href="#instagram" className="hover:text-gray-500">
                <FaInstagram size={18} className="md:size-7" />
              </a>
            </div>
          </div>
          <div className="p-4 md:p-5">
            <h4 className="text-base md:text-lg font-semibold mb-2 font-albert">
              Nossos contatos
            </h4>
            <p className="text-sm md:text-base flex items-center p-2">
              <img src={Whats} alt="Icone Whatsapp" className="w-5 h-5 mr-2" />{" "}
              (11) 1234-5678
            </p>
            <p className="text-sm md:text-base flex items-center p-2">
              <img src={Email} alt="Icone e-mail" className="w-5 h-5 mr-2" />{" "}
              sac@larmoby.com
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pb-3 flex flex-col md:flex-row items-center justify-between px-4 md:px-10 text-sm">
        <p className="mb-4 md:mb-0 text-center md:text-left">
          LarMoby Ltda. - CNPJ: 40.028.922/0007-42 - Tel.: (11)4002-8922 <br />
          Endereço: Av. Marginal Direita do Tietê, 500, São Paulo - SP - CEP:
          01142-300
        </p>
        <p className="text-center md:text-right">
          Copyright © 2025 LarMoby - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;

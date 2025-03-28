import heroImage from "../assets/image_home.svg";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="bg-yellow-50 h-[92vh] flex justify-center items-center px-6 md:px-12">
      <div className="container max-w-7xl flex flex-col md:flex-row items-center py-16">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Decoração de casa"
            className="max-w-full w-auto h-auto md:max-w-lg"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center mt-6 md:mt-0 md:ml-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Crie seu lar dos sonhos com a LarMoby!
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            🏠 3600+ móveis incríveis para sua casa <br />
            🛍️ 100+ Lojas espalhadas pelo Brasil
          </p>
          <Link
            to="/produtos"
            className="mt-6 px-6 py-3 bg-yellow-500 text-white text-center font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition w-full md:w-auto"
          >
            <button>Explore a nossa coleção!</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

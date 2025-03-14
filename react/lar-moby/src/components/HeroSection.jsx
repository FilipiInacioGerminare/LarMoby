import heroImage from "../assets/image_home.svg";

function HeroSection() {
  return (
    <section className="bg-yellow-50 h-[92vh] flex justify-center items-center px-6 md:px-12">
      <div className="container max-w-7xl flex md:flex-row items-center py-16">
        <div className="w-full flex justify-center items-center">
          <img
            src={heroImage}
            alt="Decoração de casa"
            className="max-w-2xl w-full h-auto mr-auto"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center mt-6 md:mt-0">
          <h1 className="text-4xl font-bold text-gray-800">
            Crie seu lar dos sonhos com a LarMoby!
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            🏠 3600+ móveis incríveis para sua casa <br />
            🛍️ 100+ Lojas espalhadas pelo Brasil
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition">
            Explore a nossa coleção!
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

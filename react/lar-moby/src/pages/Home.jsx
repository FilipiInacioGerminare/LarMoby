import HeroSection from "../components/HeroSection";
import Carousel from "../components/Carousel";

function Home() {
  return (
    <div className="bg-[#FDFBF6] text-gray-800">
      <HeroSection />
      <Carousel />
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Sobre a empresa</h2>
        <p className="text-gray-700 leading-relaxed">
          Bem-vindo à LarMoby! Somos um e-commerce especializado em decoração e
          móveis para transformar sua casa em um verdadeiro lar. Nossa missão é
          oferecer produtos de qualidade com praticidade e conforto.
        </p>
        <img
          src="https://via.placeholder.com/600x300"
          alt="Sala decorada"
          className="rounded-lg shadow-lg mt-6 mx-auto"
        />
      </section>
    </div>
  );
}

export default Home;

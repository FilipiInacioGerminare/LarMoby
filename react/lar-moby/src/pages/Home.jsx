import HeroSection from "../components/HeroSection";
import Carousel from "../components/Carousel";
import Image from "../assets/imagem_sobre.png";

function Home() {
  return (
    <div className="bg-[#FDFBF6] text-gray-800">
      <HeroSection />
      <Carousel />
      <section className="py-16 px-6 max-w-5xl mx-auto text-center bg-[#FDFBF6] relative">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Sobre a empresa
        </h2>

        {/* Text */}
        <div className="flex ">
          <p className="text-gray-700 leading-relaxed text-lg max-w-2xl mx-auto">
            Bem-vindo à LarMoby! Somos um e-commerce especializado em decoração
            e móveis para transformar sua casa em um verdadeiro lar. Nossa
            missão é oferecer produtos de qualidade, com praticidade e conforto
            para todos os estilos. Aqui, você encontra desde peças clássicas até
            as mais modernas, perfeitas para qualquer ambiente. Nosso objetivo é
            criar espaços que tragam aconchego e personalidade, com a facilidade
            de comprar online e receber no conforto do seu lar. Descubra o
            prazer de decorar com a LarMoby!
          </p>
          {/* Image */}
          <div className="relative mt-8">
            <img
              src={Image}
              alt="Sala decorada"
              className="rounded-lg shadow-lg mx-auto w-full max-w-3xl h-auto object-cover"
            />
            {/* Optional: Add a subtle overlay or border effect */}
            <div className="absolute inset-0 border-4 border-gray-200 rounded-lg"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

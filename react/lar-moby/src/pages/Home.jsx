import HeroSection from "../components/HeroSection";
import Carousel from "../components/Carousel";
import Image from "../assets/imagem_sobre.png";

function Home() {
  return (
    <div className="bg-[#FDFBF6] text-gray-800">
      <HeroSection />
      <Carousel />
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 flex justify-center font-amaranth">
        Sobre a empresa
      </h2>
      <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4 font-albert">
            Bem-vindo à LarMoby! Somos uma e-commerce especializada em
            decorações e móveis que combinam design, funcionalidade e qualidade,
            pensados para quem busca criar ambientes únicos e acolhedores.
          </p>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4 font-albert">
            Na LarMoby, acreditamos que cada detalhe faz a diferença, por isso,
            nosso compromisso vai além da entrega de produtos. Queremos inspirar
            você a criar espaços que contem a sua história, com peças que unem
            beleza e praticidade. Por isso, trabalhamos com marcas reconhecidas
            e fornecedores confiáveis, garantindo a melhor experiência de
            compra, do clique à entrega.
          </p>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg font-albert">
            Estamos aqui para ajudar você a criar o lar dos seus sonhos. Explore
            nosso catálogo, inspire-se e deixe a LarMoby fazer parte da sua
            história. Porque acreditamos que um lar bem decorado é onde a vida
            ganha mais cor e significado.
          </p>
        </div>

        <div className="w-full md:w-1/2 order-1 md:order-2 mb-6 md:mb-0">
          <img
            src={Image}
            alt="Sala decorada"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;

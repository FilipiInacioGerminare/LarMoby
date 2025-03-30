import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sala_estar from "../assets/sala_estar.png";
import Quarto from "../assets/quarto.png";
import Cozinha from "../assets/cozinha.png";
import Banheiro from "../assets/banheiro.png";
import Sala_jantar from "../assets/sala_jantar.png";

// Array com imagens do carrossel
const images = [
  { src: Sala_estar, alt: "Sala de estar" },
  { src: Quarto, alt: "Quarto" },
  { src: Cozinha, alt: "Cozinha" },
  { src: Banheiro, alt: "Banheiro" },
  { src: Sala_jantar, alt: "Sala de jantar" },
];

function Carrossel() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - carousel.offsetLeft);
      setScrollLeft(carousel.scrollLeft);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    carousel.addEventListener("mousedown", handleMouseDown);
    carousel.addEventListener("mousemove", handleMouseMove);
    carousel.addEventListener("mouseup", handleMouseUp);
    carousel.addEventListener("mouseleave", handleMouseUp);

    return () => {
      carousel.removeEventListener("mousedown", handleMouseDown);
      carousel.removeEventListener("mousemove", handleMouseMove);
      carousel.removeEventListener("mouseup", handleMouseUp);
      carousel.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  const scrollLeftHandler = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  // Handle image click to navigate to /busca with the category
  const handleImageClick = (category) => {
    navigate("/busca", { state: { searchTerm: category } });
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-8 md:mb-12 font-amaranth">
        Explore nossos móveis por ambiente
      </h2>
      <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Botão de seta esquerda - escondido em mobile */}
          <button
            onClick={scrollLeftHandler}
            className="hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white text-gray-800 rounded-full shadow-lg hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-110 -ml-4 sm:-ml-6 md:-ml-8 z-10"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Carrossel */}
          <div
            ref={carouselRef}
            className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full mx-auto"
            style={{ scrollBehavior: "smooth" }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="rounded-xl snap-center shrink-0 relative group overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(image.alt)} // Add click handler
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-56 sm:w-64 md:w-80 h-auto rounded-xl shadow-xl object-cover transition-transform group-hover:scale-105"
                />
                {/* Overlay com o texto da categoria */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-base sm:text-lg md:text-xl font-semibold font-albert">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botão de seta direita - escondido em mobile */}
          <button
            onClick={scrollRightHandler}
            className="hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white text-gray-800 rounded-full shadow-lg hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-110 -mr-4 sm:-mr-6 md:-mr-8 z-10"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <button className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-white font-medium rounded-full shadow-md hover:bg-yellow-500 transition transform hover:scale-105 font-albert">
        Ou explore todos os nossos produtos
      </button>
    </section>
  );
}

export default Carrossel;
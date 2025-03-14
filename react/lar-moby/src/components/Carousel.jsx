import { useState, useRef, useEffect } from "react";
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

  return (
    <section className="py-16 bg-gray-50 text-center h-[90vh]">
      <h2 className="text-3xl font-semibold text-gray-800 mb-12">
        Explore nossos móveis por ambiente
      </h2>
      <div className="relative w-full max-w-5xl mx-auto ">
        {" "}
        {/* Aumentei o padding para dar espaço às setas */}
        <div className="flex items-center justify-between">
          <button
            onClick={scrollLeftHandler}
            className="flex items-center justify-center w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-105 -ml-16" // Movido para fora com -ml-16
          >
            <svg
              className="w-6 h-6"
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

          <div
            ref={carouselRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full"
            style={{ scrollBehavior: "smooth" }}
          >
            {images.map((image, index) => (
              <div key={index} className="snap-center shrink-0 ">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-80 h-auto rounded-lg shadow-lg object-cover"
                />
              </div>
            ))}
          </div>

          {/* Botão de seta direita */}
          <button
            onClick={scrollRightHandler}
            className="flex items-center justify-center w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-105 -mr-16" // Movido para fora com -mr-16
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 24"
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
      <button className="mt-8 px-6 py-3 bg-yellow-400 text-white font-medium rounded-full shadow-md hover:bg-yellow-500 transition">
        Ou explore todos os nossos produtos
      </button>
    </section>
  );
}

export default Carrossel;

// HeroSection.js
function HeroSection() {
  return (
    <section className="bg-yellow-100 py-16 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Crie seu lar dos sonhos com a LarMoby!
        </h1>
        <p className="mt-4 text-gray-600">
          3600+ móveis incríveis para sua casa e 100+ lojas espalhadas pelo
          Brasil.
        </p>
        <button className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600">
          Explore a nossa coleção!
        </button>
      </div>
    </section>
  );
}

export default HeroSection;

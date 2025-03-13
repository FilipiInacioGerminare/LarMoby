// CategorySection.js
function Carrosel() {
    return (
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore nossos móveis por ambiente</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">Sala de Estar</div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">Quarto</div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">Cozinha</div>
        </div>
      </section>
    );
  }
  
  export default Carrosel;
  
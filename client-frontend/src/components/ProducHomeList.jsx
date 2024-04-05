
function ProductHomeList({products, goToCatalog}) {

  const categories = Array.from(new Set(products.map(product => product.category)));

return (
  <div className="container mx-auto border border-black-300 p-4 mt-5 shadow-md rounded-lg">
    <div className="flex flex-wrap justify-center ">
      {categories.map((category, index) => {
      const productImage = products.find(product => product.category === category);
      return (
        <div key={index} onClick={goToCatalog} className="cursor-pointer w-64 mx-4 my-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={productImage.image}
            alt="Imagen de Categoría"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-lg font-semibold">{category}</p>
          </div>
        </div>
      </div>
      );
      })}
  </div>
  </div>
);
}

export default ProductHomeList;
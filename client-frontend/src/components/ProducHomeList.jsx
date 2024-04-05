
function ProductHomeList({products, goToCatalog}) {

    const categories = Array.from(new Set(products.map(product => product.category)));
  
  return (
    <div className="container">
        {categories.map((category, index) => {
        const productImage = products.find(product => product.category === category);
        return (
            <div key={index} onClick={goToCatalog} className="cursor-pointer">
            <img src={productImage.image} alt="Imagen de Categoría" className="w-7/10"/>
            <p>{category}</p>
            </div>
        );
        })}
    </div>
  );
}

export default ProductHomeList;
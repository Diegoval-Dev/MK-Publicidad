import PropTypes from 'prop-types';
import ProductCategory from "./ProductCategory";
import useNavigate from '@hooks/useNavigate';

function ProductHomeList({products}) {
  const { navigate, params } = useNavigate();

  const categories = Array.from(new Set(products.map(product => product.category)));


  return (
    <div className="container mx-auto border border-black-300 p-4 mt-5 shadow-md rounded-lg">
      <div className="flex flex-wrap justify-center ">
        {categories.map((category, index) => {
        const productImage = products.find(product => product.category === category);
        return (
          <div key={index} onClick={() => navigate('catalogue', category)}  className="cursor-pointer w-64 mx-4 my-4">
            <ProductCategory
              image={productImage.image}
              category={category}
            />
        </div>
        );
        })}
    </div>
    </div>
);
}

ProductHomeList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductHomeList;
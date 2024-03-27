import Product from "../../models/productModel";

const createProduct = async (product) => {
    try {
        const newProduct = await Product.create(product);
        return newProduct;
    } catch (error) {
        throw error;
    }
}

const getProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        throw error;
    }
}

const getProductById = async (id) => {
    try {
        const product = await Product.findByPk(id);
        return product;
    } catch (error) {
        throw error;
    }
}

const updateProduct = async (id, product) => {
    try {
        const productToUpdate = await Product.update(product, {
            where: {
                id: id
            }
        });
        const updatedProduct = await Product.findByPk(id);
        return updatedProduct;
    } catch (error) {
        throw error;
    }
}

const deleteProduct = async (id) => {
    try {
        const product = await Product.findByPk(id);
        await Product.destroy({
            where: {
                id: id
            }
        });
        return product;
    } catch (error) {
        throw error;
    }
}
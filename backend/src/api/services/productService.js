import Product from "../../models/productModel.js";
import { Op } from "sequelize";

const createProduct = async (product) => {
    try {
        return await Product.create(product);
    } catch (error) {
        throw error;
    }
};

const getProducts = async (filters = {}) => {
    try {
        const whereClause = {};
        if (filters.name) {
            whereClause.name = { [Op.like]: `%${filters.name}%` };
        }
        if (filters.material) {
            whereClause.material = filters.material;
        }
        if (filters.category) {
            whereClause.category = filters.category;
        }

        return await Product.findAll({ where: whereClause });
    } catch (error) {
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        return await Product.findByPk(id);
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (id, product) => {
    try {
        await Product.update(product, { where: { id } });
        return await Product.findByPk(id);
    } catch (error) {
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const product = await Product.findByPk(id);
        await product.destroy();
        return product;
    } catch (error) {
        throw error;
    }
};

export default {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

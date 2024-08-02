import Product from "../../models/productModel.js";
import { Op, Sequelize } from "sequelize";

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
        if (filters.size) {
            whereClause.size = filters.size;
        }
        if (filters.color) {
            whereClause.color = filters.color;
        }
        if (filters.technique) {
            whereClause.technique = filters.technique;
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

const getFilterOptionsByCategory = async (category) => {
    try {
        const materials = await Product.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('material')), 'material']],
            where: { category }
        });

        const sizes = await Product.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('size')), 'size']],
            where: { category }
        });

        const colors = await Product.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('color')), 'color']],
            where: { category }
        });

        const techniques = await Product.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('technique')), 'technique']],
            where: { category }
        });

        return {
            materials: materials.map(item => item.material),
            sizes: sizes.map(item => item.size),
            colors: colors.map(item => item.color),
            techniques: techniques.map(item => item.technique)
        };
    } catch (error) {
        throw new Error(`Error al obtener opciones de filtrado: ${error.message}`);
    }
};


const getAllCategories = async () => {
    try {
        const categories = await Product.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category'],
                [Sequelize.fn('MAX', Sequelize.col('image')), 'image'] 
            ],
            group: ['category']
        });

        return categories.map(cat => ({
            category: cat.category,
            image: cat.image
        }));
    } catch (error) {
        throw new Error(`Error al obtener las categorías: ${error.message}`);
    }
};

const getCategoriesByKeyword = async (keyword) => {
    try {
        // Encuentra todas las categorías que coincidan con el keyword
        const categories = await Product.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category'],
                'image'
            ],
            where: {
                category: {
                    [Sequelize.Op.like]: `%${keyword}%`
                }
            }
        });

        return categories.map(cat => ({
            category: cat.category,
            image: cat.image
        }));
    } catch (error) {
        throw new Error(`Error al obtener las categorías: ${error.message}`);
    }
};

export default {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getFilterOptionsByCategory,
    getAllCategories,
    getCategoriesByKeyword
};
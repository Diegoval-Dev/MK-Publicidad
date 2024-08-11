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
        if (filters.nombre_producto) {
            whereClause.nombre_producto = { [Op.like]: `%${filters.nombre_producto}%` };
        }
        if (filters.id_categoria) {
            whereClause.id_categoria = filters.id_categoria;
        }
        if (filters.capacidad) {
            whereClause.capacidad = filters.capacidad;
        }
        if (filters.tamaño) {
            whereClause.tamaño = filters.tamaño;
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

const updateProduct = async (id_producto, product) => {
    try {
        await Product.update(product, { where: { id_producto } });
        return await Product.findByPk(id_producto);
    } catch (error) {
        throw error;
    }
};

const deleteProduct = async (id_producto) => {
    try {
        const product = await Product.findByPk(id_producto);
        await product.destroy();
        return product;
    } catch (error) {
        throw error;
    }
};

const getFilterOptionsByCategory = async (id_categoria) => {
    try {
        const capacidades = await Product.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('capacidad')), 'capacidad']],
            where: { id_categoria }
        });

        const tamaños = await Product.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('tamaño')), 'tamaño']],
            where: { id_categoria }
        });

        return {
            capacidades: capacidades.map(item => item.capacidad),
            tamaños: tamaños.map(item => item.tamaño)
        };
    } catch (error) {
        throw new Error(`Error al obtener opciones de filtrado: ${error.message}`);
    }
};


const getAllCategories = async () => {
    try {
        const categories = await Product.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('id_categoria')), 'id_categoria'],
                [Sequelize.fn('MAX', Sequelize.col('url_imagen')), 'url_imagen']
            ],
            group: ['id_categoria']
        });

        return categories.map(cat => ({
            id_categoria: cat.id_categoria,
            url_imagen: cat.url_imagen
        }));
    } catch (error) {
        throw new Error(`Error al obtener las categorías: ${error.message}`);
    }
};

const getCategoriesByKeyword = async (keyword) => {
    try {
        const categories = await Product.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('id_categoria')), 'id_categoria'],
                'url_imagen'
            ],
            where: {
                id_categoria: {
                    [Sequelize.Op.like]: `%${keyword}%`
                }
            }
        });

        return categories.map(cat => ({
            id_categoria: cat.id_categoria,
            url_imagen: cat.url_imagen
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
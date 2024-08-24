import { Product, Category, Color } from "../../models/productModel.js"; 
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
      if (filters.material) {
          whereClause.material = { [Op.like]: `%${filters.material}%` };
      }
      if (filters.capacidad) {
          whereClause.capacidad = { [Op.like]: `%${filters.capacidad}%` };
      }
      if (filters.tamano) {
          whereClause.tamano = { [Op.like]: `%${filters.tamano}%` };
      }

      return await Product.findAll({
          where: whereClause,
          include: [{
              model: Color,
              attributes: ['nombre_color', 'codigo_hexadecimal'], 
              through: { attributes: [] } 
          }]
      });
  } catch (error) {
      throw error;
  }
};


const getProductById = async (id) => {
    try {
        return await Product.findByPk(id, {
            include: [
                {
                    model: Color,
                    attributes: ['nombre_color', 'codigo_hexadecimal'],
                    through: { attributes: [] } 
                }
            ]
        });
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (id_producto, product) => {
    try {
        await Product.update(product, { where: { id_producto } });
        return await Product.findByPk(id_producto, {
            include: [
                {
                    model: Color,
                    attributes: ['nombre_color', 'codigo_hexadecimal']
                }
            ]
        });
    } catch (error) {
        throw error;
    }
};

const deleteProduct = async (id_producto) => {
    try {
        const product = await Product.findByPk(id_producto, {
            include: [
                {
                    model: Color,
                    attributes: ['nombre_color', 'codigo_hexadecimal']
                }
            ]
        });
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

        const tamanos = await Product.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('tamano')), 'tamano']],
            where: { id_categoria }
        });

        return {
            capacidades: capacidades.map(item => item.capacidad),
            tamanos: tamanos.map(item => item.tamano)
        };
    } catch (error) {
        throw new Error(`Error al obtener opciones de filtrado: ${error.message}`);
    }
};

const getAllCategories = async () => {
    try {
        const categories = await Product.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('Product.id_categoria')), 'id_categoria'],
                [Sequelize.fn('MAX', Sequelize.col('Product.url_imagen')), 'url_imagen']
            ],
            include: [{
                model: Category,
                attributes: ['nombre_categoria']
            }],
            group: ['Product.id_categoria', 'Category.id_categoria']
        });

        return categories.map(cat => ({
            id_categoria: cat.id_categoria,
            nombre_categoria: cat.Category.nombre_categoria,
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

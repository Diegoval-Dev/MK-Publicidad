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

    if (filters.product_name) {
      whereClause.product_name = { [Op.like]: `%${filters.product_name}%` };
    }
    if (filters.category_name) {
      const category = await Category.findOne({
        where: { category_name: { [Op.like]: `%${filters.category_name}%` } }
      });
      if (category) {
        whereClause.category_id = category.category_id;
      } else {
        return [];
      }
    }
    if (filters.material) {
      whereClause.material = { [Op.like]: `%${filters.material}%` };
    }
    if (filters.capacity) {
      whereClause.capacity = { [Op.like]: `%${filters.capacity}%` };
    }
    if (filters.size) {
      whereClause.size = { [Op.like]: `%${filters.size}%` };
    }

    return await Product.findAll({
      where: whereClause,
      include: [{
        model: Color,
        attributes: ['color_name', 'hex_code'],
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
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Color,
          attributes: ['color_name', 'hex_code'],
          through: { attributes: [] }
        }
      ]
    });
  } catch (error) {
    throw error;
  }
};


const updateProduct = async (product_id, product) => {
  try {
    await Product.update(product, { where: { product_id } });
    return await Product.findByPk(product_id, {
      include: [
        {
          model: Color,
          attributes: ['color_name', 'hex_code']
        }
      ]
    });
  } catch (error) {
    throw error;
  }
};

const disableProduct = async (product_id) => {
  try {
    const product = await Product.findByPk(product_id, {
      include: [
        {
          model: Color,
          attributes: ['color_name', 'hex_code']
        }
      ]
    });

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    product.is_enabled = false;  // Cambiar el estado a deshabilitado
    await product.save();  // Guardar los cambios

    return product;
  } catch (error) {
    throw error;
  }
};


const getFilterOptionsByCategory = async (category_id) => {
  try {
    const capacities = await Product.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('capacity')), 'capacity']],
      where: { category_id }
    });

    const sizes = await Product.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('size')), 'size']],
      where: { category_id }
    });

    return {
      capacities: capacities.map(item => item.capacity),
      sizes: sizes.map(item => item.size)
    };
  } catch (error) {
    throw new Error(`Error retrieving filter options: ${error.message}`);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Product.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Product.category_id')), 'category_id'],
        [Sequelize.fn('MAX', Sequelize.col('Product.image_url')), 'image_url']
      ],
      include: [{
        model: Category,
        attributes: ['category_name']
      }],
      group: ['Product.category_id', 'Category.category_id']
    });

    return categories.map(cat => ({
      category_id: cat.category_id,
      category_name: cat.Category.category_name,
      image_url: cat.image_url
    }));
  } catch (error) {
    throw new Error(`Error retrieving categories: ${error.message}`);
  }
};

const getCategoriesByKeyword = async (keyword) => {
  try {
    const categories = await Product.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Category.category_id')), 'category_id'],
        [Sequelize.fn('MAX', Sequelize.col('Product.image_url')), 'image_url']
      ],
      include: [
        {
          model: Category,
          attributes: ['category_id', 'category_name'],
          where: {
            category_name: {
              [Sequelize.Op.like]: `%${keyword}%`
            }
          }
        }
      ],
      group: ['Category.category_id', 'Category.category_name']
    });

    return categories.map(cat => ({
      category_id: cat.Category.category_id,
      category_name: cat.Category.category_name,
      image_url: cat.image_url
    }));
  } catch (error) {
    throw new Error(`Error retrieving categories: ${error.message}`);
  }
};



export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  disableProduct,
  getFilterOptionsByCategory,
  getAllCategories,
  getCategoriesByKeyword
};

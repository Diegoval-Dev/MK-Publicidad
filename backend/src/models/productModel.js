import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';
import Color from './colorModel.js';
import Category from './categoryModel.js';

const Product = db.define('Product', {
    product_id: {  
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product_name: {  
        type: DataTypes.STRING(255),
        allowNull: false
    },
    product_code: { 
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    category_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categories',  
            key: 'category_id'  
        }
    },
    capacity: { 
        type: DataTypes.STRING(50),
        allowNull: true
    },
    size: {  
        type: DataTypes.STRING(50),
        allowNull: true
    },
    image_url: {  
        type: DataTypes.STRING(255),
        allowNull: true
    },
    is_enabled: { // Campo para indicar si el producto está habilitado
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true // Se habilita por defecto
    }
}, {
    tableName: 'Products',  
    paranoid: true,
    timestamps: false
});

// relación entre Product y Category
Product.belongsTo(Category, { foreignKey: 'category_id', timestamps: false });

// Relación entre Product y Color a través de la tabla intermedia Product_Colors
Product.belongsToMany(Color, { through: 'Product_Colors', foreignKey: 'product_id', otherKey: 'color_id', timestamps: false });

export { Product, Category, Color };

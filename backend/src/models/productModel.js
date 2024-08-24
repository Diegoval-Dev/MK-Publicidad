import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';
import Color from './colorModel.js';
import Category from './categoryModel.js';

const Product = db.define('Product', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre_producto: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    codigo_producto: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categorias',
            key: 'id_categoria'
        }
    },
    capacidad: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    tamano: { 
        type: DataTypes.STRING(50),
        allowNull: true
    },
    url_imagen: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'Productos',
    paranoid: true,
    timestamps: false
});

// relación entre Product y Category
Product.belongsTo(Category, { foreignKey: 'id_categoria' });

// Relación entre Product y Color a través de la tabla intermedia Productos_Colores
Product.belongsToMany(Color, { through: 'Productos_Colores', foreignKey: 'id_producto', otherKey: 'id_color' });

export { Product, Category, Color };

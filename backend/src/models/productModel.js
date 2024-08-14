import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const Category = db.define('Category', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre_categoria: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'Categorias',
    timestamps: false
});

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

// Definir la relación entre Product y Category
Product.belongsTo(Category, { foreignKey: 'id_categoria' });

export { Product, Category };

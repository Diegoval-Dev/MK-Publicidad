import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const Product = db.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    material: {
        type: DataTypes.STRING(100)
    },
    description: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.TEXT
    },
    size: {
        type: DataTypes.STRING(50)
    },
    color: {
        type: DataTypes.STRING(50)
    },
    technique: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'productos',
    paranoid: true,
    timestamps: false
});

export default Product;

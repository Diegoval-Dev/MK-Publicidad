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

export default Category;

import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const Category = db.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    category_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'Categories',  
    timestamps: false
});

export default Category;

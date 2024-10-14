import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const Color = db.define('Color', {
    color_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    color_name: {  
        type: DataTypes.STRING(50),
        allowNull: false
    },
    hex_code: {  
        type: DataTypes.STRING(7), 
        allowNull: false
    }
}, {
    tableName: 'Colors',  
    timestamps: false
});

export default Color;

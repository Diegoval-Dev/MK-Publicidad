import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const Color = db.define('Color', {
    id_color: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre_color: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    codigo_hexadecimal: {
        type: DataTypes.STRING(7), 
        allowNull: false
    }
}, {
    tableName: 'Colores',
    timestamps: false
});

export default Color;

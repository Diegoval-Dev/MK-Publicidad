 // models/userModel.js
import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const User = db.define('User', {
    user_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    user_password: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    user_role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    position: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_phone: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_officePhone: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'users'
});

export default User;

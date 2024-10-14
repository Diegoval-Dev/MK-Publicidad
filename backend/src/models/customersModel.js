import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const Customer = db.define('Customer', {
    customer_id: {  
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    customer_company: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    customer_email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    customer_contact: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    customer_address: {  
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'Customers', 
    paranoid: true,  
    timestamps: false  
});

export default Customer;

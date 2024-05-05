import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const Quote = db.define('Quote', {
    quotation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_nit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quote_no: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quote_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quote_sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quote_validityTill: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quote_shippingTime: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quote_payMethod: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quote_credit: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    quote_payForm: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products', 
            key: 'id'
        }
    },
    quote_status: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'quotes',
    timestamps: false 
});

export default Quote;

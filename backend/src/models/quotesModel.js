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
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quote_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quote_seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quote_validity_till: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quote_shipping_time: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    quote_pay_method: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quote_credit: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    quote_pay_form: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    product_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products', 
            key: 'product_id'  
        }
    },
    quote_status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quote_img_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    quote_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quote_details: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'Quotes',  
    timestamps: false 
});

export default Quote;

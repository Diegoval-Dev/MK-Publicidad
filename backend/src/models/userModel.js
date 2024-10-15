import { DataTypes } from 'sequelize';
import { db } from '../database/config.js';

const User = db.define(
    'User', 
    {
        user_email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: true,
            validate: {
                isEmail: {
                    msg: "You must provide a valid email address."
                }
            }
        },
        user_password: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                len: {
                    args: [8, 150],
                    msg: "The password must be at least 8 characters long."
                },
                is: {
                    args: /[!@#$%^&*(),.?":{}|<>]/g,
                    msg: "The password must include at least one symbol."
                }
            }
        },
        user_role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['admin', 'accountant', 'designer', 'content manager']],  // Translated roles
                    msg: "The specified role is not valid."
                }
            }
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
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "The phone number must contain only numbers."
                },
                len: {
                    args: [8, 15],
                    msg: "The phone number must be between 8 and 15 digits."
                }
            }
        },
        user_officePhone: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: false,
    }
);

export default User;

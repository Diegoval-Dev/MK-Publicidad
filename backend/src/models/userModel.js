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
                    msg: "Debe proporcionar un correo electrónico válido."
                }
            }
        },
        user_password: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                len: {
                    args: [8, 150],
                    msg: "La contraseña debe tener al menos 8 caracteres."
                },
                is: {
                    args: /[!@#$%^&*(),.?":{}|<>]/g,
                    msg: "La contraseña debe incluir al menos un símbolo."
                }
            }
        },
        user_role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['admin', 'contador', 'diseñadora', 'administrador de contenido']],
                    msg: "El rol especificado no es válido."
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
                    msg: "El teléfono debe contener solo números."
                },
                len: {
                    args: [8, 15],
                    msg: "El número de teléfono debe tener entre 8 y 15 dígitos."
                }
            }
        },
        user_officePhone: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: true
    }
);

export default User;

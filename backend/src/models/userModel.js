 // models/userModel.js
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
                isLongEnough: (val) => {
                    if (val.length < 8) {
                        throw new Error("La contraseña debe tener al menos 8 caracteres.");
                    }
                },
                hasSpecialCharacter: (val) => {
                    if (!/[!@#$%^&*(),.?":{}|<>]/g.test(val)) {
                        throw new Error("La contraseña debe incluir al menos un símbolo.");
                    }
                }
            }
        },
        user_role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isIn: {
                    args: ['admin', 'contador', 'diseñadora', 'administrador de contenido'],
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
                }
            }

        },
        user_officePhone: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'users'
    });

export default User;

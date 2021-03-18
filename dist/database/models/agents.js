"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentFactory = exports.AgentModel = exports.roles = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const states = [
    "Amazonas", "Anzoátegui", "Apure", "Aragua",
    "Barinas", "Bolívar", "Carabobo", "Cojedes",
    "Delta Amacuro", "Falcón", "Guárico", "Lara",
    "Mérida", "Miranda", "Monagas", "Nueva Esparta",
    "Portuguesa", "Sucre", "Táchira", "Trujillo",
    "Vargas", "Yaracuy", "Zulia"
];
exports.roles = ['manager', 'advisor'];
;
class AgentModel extends sequelize_1.Model {
}
exports.AgentModel = AgentModel;
function AgentFactory(sequelize) {
    const agent = sequelize.define('agent', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                isAlpha: true,
                notNull: true,
                notEmpty: true
            }
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                isAlpha: true,
                notNull: true,
                notEmpty: true
            }
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notNull: true,
                notEmpty: true
            }
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                notNull: true,
            }
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: true,
                isNumeric: true
            }
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                notNull: true,
                isIn: [states]
            }
        },
        role: {
            type: sequelize_1.DataTypes.ENUM,
            values: exports.roles,
            allowNull: false,
            unique: false,
            validate: {
                notNull: true,
                isIn: [exports.roles]
            }
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                notNull: true,
            }
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        }
    }, {
        tableName: 'agents',
        hooks: {
            beforeSave: (agent, options) => __awaiter(this, void 0, void 0, function* () {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(agent.password, salt);
                agent.password = hash;
            })
        },
    });
    return agent;
}
exports.AgentFactory = AgentFactory;

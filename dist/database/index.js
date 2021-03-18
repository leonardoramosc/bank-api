"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = exports.DBConn = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const models_1 = __importDefault(require("./models"));
// import { AgentFactory } from './models/agents';
const DB_URL = `postgresql://${config_1.default.DB.USER}:${config_1.default.DB.PASSWORD}@${config_1.default.DB.HOST}:${config_1.default.DB.PORT}/${config_1.default.DB.NAME}`;
const dialectOptions = {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
};
exports.DBConn = new sequelize_1.Sequelize(DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    // dialectOptions
});
exports.Agent = models_1.default.AgentFactory(exports.DBConn);

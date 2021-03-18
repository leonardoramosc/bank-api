"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
database_1.DBConn.sync().then(() => {
    const server = app_1.default.listen(app_1.default.get('port'), () => {
        console.log(`server listen on port: ${app_1.default.get('port')}`);
    });
    process.on('SIGTERM', () => {
        console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
        server.close(() => {
            console.log('💥 Process terminated!');
        });
    });
});

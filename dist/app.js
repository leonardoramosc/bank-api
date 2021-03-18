"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const agent_routes_1 = __importDefault(require("./routes/agent.routes"));
const app = express_1.default();
// Settings
app.set('port', process.env.PORT || 4000);
// middlewares
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors_1.default());
// routes
app.get('/', (req, res) => {
    res.json(`API servin on port: ${app.get('port')}`);
});
app.use('/api', auth_routes_1.default);
app.use('/api/agents', agent_routes_1.default);
exports.default = app;

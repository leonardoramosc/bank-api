"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_controller_1 = require("../controllers/agent.controller");
const router = express_1.Router();
router.get('', agent_controller_1.getAllAgents);
exports.default = router;

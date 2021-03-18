"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_controller_1 = require("../controllers/agent.controller");
const router = express_1.Router();
router.post('/signup', agent_controller_1.signUp);
router.post('/signin', agent_controller_1.signIn);
exports.default = router;

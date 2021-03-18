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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAgents = exports.signIn = exports.signUp = void 0;
const database_1 = require("../database");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAgent = yield database_1.Agent.create(req.body);
        return res.status(201).json({
            msg: 'Agent created successfully',
            agent: newAgent
        });
    }
    catch (err) {
        if (err.errors) {
            const error = err.errors[0];
            return res.status(400).json({
                error: {
                    msg: error.message
                }
            });
        }
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.signIn = signIn;
const getAllAgents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agents = yield database_1.Agent.findAll();
        res.status(200).json({
            agents
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
});
exports.getAllAgents = getAllAgents;

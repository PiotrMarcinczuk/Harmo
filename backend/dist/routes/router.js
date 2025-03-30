"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const router = express_1.default.Router();
router.use((0, cors_1.default)({
    origin: process.env.ORIGIN, // Allow requests from this origin
    methods: ["GET", "POST", "DELETE", "PATCH"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials
}));
exports.default = router;

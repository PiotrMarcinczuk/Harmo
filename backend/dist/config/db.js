"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_typescript_1 = require("sequelize-typescript");
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.ADMIN,
    password: process.env.PASSWORD,
    host: process.env.DB_HOST, // CHANGE THIS
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dialect: "postgres",
});
sequelize
    .authenticate()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));
exports.default = sequelize;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class User extends sequelize_1.Model {
}
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    is_admin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    date_of_birth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "users_account",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = User;

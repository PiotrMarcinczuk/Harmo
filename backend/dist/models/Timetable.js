"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Timetable extends sequelize_1.Model {
}
Timetable.init({
    timetable_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "users_account",
            key: "user_id",
        },
        allowNull: false,
    },
    timetable_name: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "timetables",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = Timetable;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class EventMembers extends sequelize_1.Model {
}
EventMembers.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    event_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "events",
            key: "event_id",
        },
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users_account",
            key: "user_id",
        },
    },
}, {
    sequelize: db_1.default,
    tableName: "event_members",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = EventMembers;

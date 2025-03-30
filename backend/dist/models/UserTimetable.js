"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const Timetable_1 = __importDefault(require("./Timetable"));
class UserTimetable extends sequelize_1.Model {
}
UserTimetable.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users_account",
            key: "user_id",
        },
    },
    timetable_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "timetables",
            key: "timetable_id",
        },
    },
}, {
    sequelize: db_1.default,
    tableName: "user_timetables",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
UserTimetable.hasMany(Timetable_1.default, {
    foreignKey: "timetable_id",
    sourceKey: "timetable_id",
    as: "timetables",
});
exports.default = UserTimetable;

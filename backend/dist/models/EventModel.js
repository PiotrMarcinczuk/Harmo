"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const EventMembers_1 = __importDefault(require("./EventMembers"));
class EventModel extends sequelize_1.Model {
}
EventModel.init({
    event_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    timetable_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "timetables",
            key: "timetable_id",
        },
    },
    event_name: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    start_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
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
    tableName: "events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
EventModel.hasMany(EventMembers_1.default, {
    foreignKey: "event_id",
    sourceKey: "event_id",
    as: "event_members",
});
EventModel.hasMany(EventMembers_1.default, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    as: "users_account",
});
exports.default = EventModel;

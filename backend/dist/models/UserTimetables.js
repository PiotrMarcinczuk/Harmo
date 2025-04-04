"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const db_1 = __importDefault(require("../config/db"));
const User_1 = __importDefault(require("./User"));
const Timetable_1 = __importDefault(require("./Timetable"));
class UserTimetable extends sequelize_typescript_1.Model {
}
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    __metadata("design:type", Number)
], UserTimetable.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Timetable_1.default),
    __metadata("design:type", Number)
], UserTimetable.prototype, "timetable_id", void 0);
UserTimetable.init({
    user_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: User_1.default,
            key: "user_id",
        },
    },
    timetable_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: Timetable_1.default,
            key: "timetable_id",
        },
    },
}, { sequelize: db_1.default, tableName: "user_timetables" });

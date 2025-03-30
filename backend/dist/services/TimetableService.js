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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Timetable_1 = __importDefault(require("../models/Timetable"));
const UserTimetable_1 = __importDefault(require("../models/UserTimetable"));
const sequelize_1 = require("sequelize");
const exception_1 = __importDefault(require("../exceptions/exception"));
class TimetableService {
    constructor() {
        this.createTimetable = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const error = new exception_1.default(422, "Validation failed, entered data is incorrect.");
                next(error);
            }
            const { name } = req.body;
            const userId = req.user.userId;
            if (!name || !userId) {
                const error = new exception_1.default(422, "Timetable name and user ID are required.");
                next(error);
            }
            try {
                const existingTimetables = yield Timetable_1.default.findAll({
                    where: { user_id: userId },
                });
                if (existingTimetables.length >= 5) {
                    const error = new exception_1.default(422, "You have reached the maximum number of timetables.");
                    next(error);
                }
                const newTimetable = yield Timetable_1.default.create({
                    timetable_name: name,
                    user_id: userId,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                yield UserTimetable_1.default.create({
                    user_id: userId,
                    timetable_id: newTimetable.timetable_id,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                return newTimetable;
            }
            catch (error) {
                next(error);
            }
        });
        this.assignToTimetable = (collaboratorId, timetableId, next) => __awaiter(this, void 0, void 0, function* () {
            if (!collaboratorId || !timetableId) {
                const error = new exception_1.default(422, "Collaborator ID and Timetable ID are required.");
                next(error);
            }
            try {
                const result = yield UserTimetable_1.default.create({
                    collaborator_id: collaboratorId,
                    timetable_id: timetableId,
                });
                return result;
            }
            catch (error) {
                next(error);
            }
        });
        this.getTimetables = (userId, next) => __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                const error = new exception_1.default(422, "User ID is required to fetch timetables.");
                next(error);
            }
            try {
                const result = yield Timetable_1.default.findAll({
                    where: { user_id: userId },
                });
                if (result.length > 0)
                    return result;
                const resultForCollaborator = yield UserTimetable_1.default.findAll({
                    where: { user_id: userId },
                    include: [
                        {
                            association: "timetables",
                            required: true,
                        },
                    ],
                });
                return resultForCollaborator;
            }
            catch (error) {
                console.log("error", error);
                next(error);
            }
        });
        this.getTimetableById = (userId, timetableId, next) => __awaiter(this, void 0, void 0, function* () {
            if (!userId || !timetableId) {
                const error = new exception_1.default(422, "User ID and Timetable ID are required to fetch timetable.");
                next(error);
            }
            try {
                const result = yield Timetable_1.default.findOne({
                    where: { user_id: userId, timetable_id: timetableId },
                });
                return result;
            }
            catch (error) {
                next(error);
            }
        });
        this.getTimetablesForCollaborator = (userId, next) => __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                const error = new exception_1.default(422, "User ID is required to fetch timetables for collaborator.");
                next(error);
            }
            try {
                let result;
                const query = yield UserTimetable_1.default.findAll({
                    where: { user_id: userId },
                });
                if (query) {
                    const timetableIds = query.map((row) => row.timetable_id);
                    result = yield Timetable_1.default.findAll({
                        where: {
                            timetable_id: {
                                [sequelize_1.Op.in]: timetableIds,
                            },
                        },
                    });
                }
                console.log("result", result);
                return result;
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new TimetableService();
        }
        return this.instance;
    }
}
TimetableService.instance = null;
exports.default = TimetableService;

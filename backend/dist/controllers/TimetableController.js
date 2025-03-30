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
const TimetableService_1 = __importDefault(require("../services/TimetableService"));
class TimetableController {
    constructor() {
        this.createTimetable = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.timetableService.createTimetable(req, res, next);
            res.status(201).json(response);
        });
        this.assignToTimetable = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { collaboratorId, timetableId } = req.body;
            const response = yield this.timetableService.assignToTimetable(collaboratorId, timetableId, next);
            res.status(201).json(response);
        });
        this.getTimetables = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.query;
            const response = yield this.timetableService.getTimetables(userId, next);
            res.status(200).json(response);
        });
        this.getTimetableById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId, timetableId } = req.query;
            const response = yield this.timetableService.getTimetableById(userId, timetableId, next);
            res.status(200).json(response);
        });
        this.getTimetablesForCollaborator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.query;
            const response = yield this.timetableService.getTimetablesForCollaborator(userId, next);
            res.status(200).json(response);
        });
        this.timetableService = TimetableService_1.default.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new TimetableController();
        }
        return this.instance;
    }
}
TimetableController.instance = null;
exports.default = TimetableController;

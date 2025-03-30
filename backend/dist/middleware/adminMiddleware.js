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
exports.checkTimetableOwnership = void 0;
const Timetable_1 = __importDefault(require("../models/Timetable"));
const exception_1 = __importDefault(require("../exceptions/exception"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const checkTimetableOwnership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idFromToken = req.user.userId;
    const timetableId = req.query.timetableId || req.body.timetableId;
    if (!timetableId && !idFromToken) {
        const error = new exception_1.default(401, "You do not have access to this resource.");
        next(error);
    }
    try {
        let result = null;
        if (timetableId) {
            result = yield Timetable_1.default.findOne({
                attributes: ["user_id"],
                where: { timetable_id: timetableId },
            });
        }
        else {
            result = yield Timetable_1.default.findOne({
                attributes: ["timetable_id"],
                where: { user_id: idFromToken },
            });
        }
        if (!(result === null || result === void 0 ? void 0 : result.dataValues)) {
            const error = new exception_1.default(401, "You do not have access to this resource.");
            next(error);
        }
        if (timetableId && result) {
            const idFromRequest = Number(result.user_id);
            if (parseInt(idFromToken) !== idFromRequest) {
                const error = new exception_1.default(401, "You do not have access to this resource.");
                next(error);
            }
        }
    }
    catch (error) {
        next(error);
    }
    res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN);
    next();
});
exports.checkTimetableOwnership = checkTimetableOwnership;

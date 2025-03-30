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
exports.checkIsUserInTimetable = exports.checkTokenOwnership = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exception_1 = __importDefault(require("../exceptions/exception"));
const UserTimetable_1 = __importDefault(require("../models/UserTimetable"));
const authenticateToken = (req, res, next) => {
    const cookies = req.headers["cookie"];
    if (!cookies) {
        const error = new exception_1.default(401, "You do not have access to this resource.");
        next(error);
    }
    const getCookie = (name) => {
        const cookieArr = cookies.split("; ");
        for (let cookie of cookieArr) {
            const [cookieName, cookieValue] = cookie.split("=");
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    };
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
        const error = new exception_1.default(401, "You do not have access to this resource.");
        next(error);
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        const error = new exception_1.default(401, "You do not have access to this resource.");
        next(error);
    }
    else {
        jsonwebtoken_1.default.verify(accessToken, jwtSecret, (err, user) => {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
};
exports.authenticateToken = authenticateToken;
const checkTokenOwnership = (req, res, next) => {
    const idFromToken = req.user.userId;
    let idFromRequest = req.query.userId || req.body.userId;
    if (parseInt(idFromToken) !== parseInt(idFromRequest)) {
        const error = new exception_1.default(401, "You do not have access to this resource.");
        next(error);
    }
    next();
};
exports.checkTokenOwnership = checkTokenOwnership;
const checkIsUserInTimetable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const timetableId = req.query.timetableId || req.body.timetableId;
    try {
        const response = yield UserTimetable_1.default.findAll({
            where: {
                timetable_id: timetableId,
                user_id: userId,
            },
        });
        if (!response || response.length === 0) {
            const error = new exception_1.default(401, "You do not have access to this resource.");
            next(error);
        }
        else {
            next();
        }
    }
    catch (error) {
        next(error);
    }
});
exports.checkIsUserInTimetable = checkIsUserInTimetable;

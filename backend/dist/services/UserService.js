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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const UserTimetable_1 = __importDefault(require("../models/UserTimetable"));
const EventModel_1 = __importDefault(require("../models/EventModel"));
const EventMembers_1 = __importDefault(require("../models/EventMembers"));
const sequelize_1 = require("sequelize");
const exception_1 = __importDefault(require("../exceptions/exception"));
class UserService {
    constructor() {
        this.getUser = (userId, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findByPk(userId);
                if (!user) {
                    const error = new exception_1.default(404, "User not found. Please, check the user id and try again.");
                    next(error);
                }
                const _a = user.get({
                    plain: true,
                }), { password_hash } = _a, userWithoutPassword = __rest(_a, ["password_hash"]);
                return userWithoutPassword;
            }
            catch (error) {
                next(error);
            }
        });
        this.getCollaborators = (timetableId, userId, next) => __awaiter(this, void 0, void 0, function* () {
            const collaboratorsWithoutPassword = [];
            if (!timetableId) {
                const error = new exception_1.default(404, "Timetable id is required. Please, provide a valid timetable id.");
                next(error);
            }
            try {
                const collaboratorsInfo = yield UserTimetable_1.default.findAll({
                    where: { timetable_id: timetableId },
                });
                const collaboratorIds = collaboratorsInfo.map((collaborator) => collaborator.user_id);
                const collaborators = yield User_1.default.findAll({
                    where: {
                        user_id: { [sequelize_1.Op.in]: collaboratorIds },
                    },
                });
                for (const collaborator of collaborators) {
                    const _a = collaborator.dataValues, { password_hash } = _a, collaboratorWithoutPassword = __rest(_a, ["password_hash"]);
                    collaboratorsWithoutPassword.push(collaboratorWithoutPassword);
                }
                return collaboratorsWithoutPassword;
            }
            catch (error) {
                next(error);
            }
        });
        this.getCollaboratorsForEvent = (eventId, next) => __awaiter(this, void 0, void 0, function* () {
            const collaboratorsWithoutPassword = [];
            if (!eventId) {
                const error = new exception_1.default(404, "Event ID is required. Please, provide a valid event id.");
                next(error);
            }
            try {
                const collaboratorsInfo = yield EventMembers_1.default.findAll({
                    where: { event_id: eventId },
                });
                if (collaboratorsInfo.length > 0) {
                    const collaboratorIds = collaboratorsInfo.map((collaborator) => collaborator.user_id);
                    const collaborators = yield User_1.default.findAll({
                        where: {
                            user_id: { [sequelize_1.Op.in]: collaboratorIds },
                        },
                    });
                    for (const collaborator of collaborators) {
                        const _a = collaborator.dataValues, { password_hash } = _a, collaboratorWithoutPassword = __rest(_a, ["password_hash"]);
                        collaboratorsWithoutPassword.push(collaboratorWithoutPassword);
                    }
                }
                return collaboratorsWithoutPassword;
            }
            catch (error) {
                next(error);
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("accessToken", {
                sameSite: "None",
                secure: true,
                httpOnly: true,
            });
            res.clearCookie("refreshAccessToken", {
                sameSite: "None",
                secure: true,
                httpOnly: true,
            });
            res.clearCookie("currentUser", {
                path: "/",
            });
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return { errors: errors.array() };
            }
            const { name, email, password, dateOfBirth, surname, nickname, phone, isAdmin = false, timetableId, } = req.body;
            try {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield User_1.default.create({
                    name,
                    email,
                    date_of_birth: dateOfBirth,
                    nickname,
                    password_hash: hashedPassword,
                    surname,
                    phone,
                    created_at: new Date(),
                    is_admin: isAdmin,
                });
                if (newUser) {
                    yield UserTimetable_1.default.create({
                        user_id: newUser.user_id,
                        timetable_id: timetableId,
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                }
                return newUser;
            }
            catch (error) {
                next(error);
            }
        });
        this.getUserById = (targetUserId, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findByPk(targetUserId);
                if (!user) {
                    const error = new exception_1.default(404, "User not found. Please, check the user id and try again.");
                    next(error);
                }
                const _a = user.dataValues, { password_hash } = _a, userWithoutPassword = __rest(_a, ["password_hash"]);
                return userWithoutPassword;
            }
            catch (error) {
                next(error);
            }
        });
        this.removeUser = (removedUserId, timetableId, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield EventModel_1.default.findAll({
                    where: { timetable_id: timetableId },
                    attributes: ["event_id"],
                });
                const eventIds = events.map((event) => event.event_id);
                yield EventMembers_1.default.destroy({
                    where: {
                        user_id: removedUserId,
                        event_id: { [sequelize_1.Op.in]: eventIds },
                    },
                });
                yield UserTimetable_1.default.destroy({
                    where: { user_id: removedUserId, timetable_id: timetableId },
                });
                // await UserTimetable.destroy({
                //   where: { user_id: removedUserId },
                // });
                // await EventMembers.destroy({
                //   where: { user_id: removedUserId },
                // });
                // await User.destroy({
                //   where: { user_id: removedUserId },
                // });
                return { message: "User removed from your timetable" };
            }
            catch (error) {
                next(error);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return { errors: errors.array() };
            }
            const { name, email, password, dateOfBirth, surname, nickname, phone, assignedUserId, } = req.body;
            try {
                if (password) {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    yield User_1.default.update({
                        name,
                        email,
                        date_of_birth: dateOfBirth,
                        nickname,
                        password_hash: hashedPassword,
                        surname,
                        phone,
                    }, {
                        where: { user_id: assignedUserId },
                        returning: true,
                    });
                }
                else {
                    yield User_1.default.update({
                        name,
                        email,
                        date_of_birth: dateOfBirth,
                        nickname,
                        surname,
                        phone,
                    }, {
                        where: { user_id: assignedUserId },
                        returning: true,
                    });
                }
                return { message: "User updated" };
            }
            catch (error) {
                next(error);
            }
        });
        this.addCollaborator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { timetableId, userId, email } = req.body;
            if (!timetableId || !userId) {
                const error = new exception_1.default(404, "Timetable id, user id and email are required. Please, provide a valid timetable id and user id");
                next(error);
            }
            if (!email) {
                const error = new exception_1.default(404, "Email is required. Please, provide a valid email", { email: true });
                next(error);
            }
            try {
                const user = yield User_1.default.findOne({ where: { email: email } });
                if (!user) {
                    const error = new exception_1.default(404, "User not found. Please, check the email and try again", { email: true });
                    next(error);
                }
                const isUserAlreadyCollaborator = yield UserTimetable_1.default.findOne({
                    where: { user_id: user.user_id, timetable_id: timetableId },
                });
                if (isUserAlreadyCollaborator) {
                    const error = new exception_1.default(422, "User is already a collaborator for this timetable", { email: true });
                    next(error);
                }
                if (user && user.is_admin === true) {
                    const error = new exception_1.default(403, "You cannot add an admin as a collaborator");
                    next(error);
                }
                else {
                    yield UserTimetable_1.default.create({
                        user_id: user.user_id,
                        timetable_id: timetableId,
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                }
                return { message: "User added as a collaborator" };
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }
}
UserService.instance = null;
exports.default = UserService;

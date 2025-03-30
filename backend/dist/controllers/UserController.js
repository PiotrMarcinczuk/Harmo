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
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    constructor() {
        this.userService = UserService_1.default.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.user;
            const user = yield this.userService.getUser(userId, next);
            return res.status(200).json(user);
        });
    }
    getCollaborators(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { timetableId, userId } = req.query;
            const collaborators = yield this.userService.getCollaborators(Number(timetableId), Number(userId), next);
            return res.status(200).json(collaborators);
        });
    }
    getCollaboratorsForEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.query;
            const result = yield this.userService.getCollaboratorsForEvent(Number(eventId), next);
            return res.status(200).json(result);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.logout(req, res);
            return res.status(201).json({ message: "Logged out" });
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.createUser(req, res, next);
            return res.status(201).json(result);
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { targetUserId } = req.query;
            const result = yield this.userService.getUserById(Number(targetUserId), next);
            return res.status(200).json(result);
        });
    }
    removeUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { removedUserId, timetableId } = req.body;
            const result = yield this.userService.removeUser(Number(removedUserId), Number(timetableId), next);
            return res.status(201).json(result);
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.updateUser(req, res, next);
            return res.status(200).json(result);
        });
    }
    addCollaborator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.addCollaborator(req, res, next);
            if (result)
                return res.status(200).json(result);
        });
    }
}
UserController.instance = null;
exports.default = UserController;

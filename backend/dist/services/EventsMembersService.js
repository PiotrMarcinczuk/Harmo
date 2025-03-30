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
const EventMembers_1 = __importDefault(require("../models/EventMembers"));
const User_1 = __importDefault(require("../models/User"));
const sequelize_1 = require("sequelize");
const exception_1 = __importDefault(require("../exceptions/exception"));
class EventsMembersService {
    constructor() {
        this.assignUserToEvent = (eventId, assignedUserId, next) => __awaiter(this, void 0, void 0, function* () {
            if (!eventId || !assignedUserId) {
                const error = new exception_1.default(422, "Event ID and assigned user ID are required.");
                next(error);
            }
            try {
                const assign = yield EventMembers_1.default.create({
                    event_id: eventId,
                    user_id: assignedUserId,
                });
                return assign;
            }
            catch (error) {
                next(error);
            }
        });
        this.getEventMembers = (eventId, next) => __awaiter(this, void 0, void 0, function* () {
            if (!eventId) {
                const error = new exception_1.default(422, "Event ID is required.");
                next(error);
            }
            try {
                const result = yield EventMembers_1.default.findAll({
                    where: { event_id: eventId },
                });
                const userIds = result.map((user) => user.user_id);
                const users = yield User_1.default.findAll({
                    where: {
                        user_id: {
                            [sequelize_1.Op.in]: userIds,
                        },
                    },
                });
                users.forEach((user) => {
                    delete user.password_hash;
                });
                return users;
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventsMembersService();
        }
        return this.instance;
    }
}
EventsMembersService.instance = null;
exports.default = EventsMembersService;

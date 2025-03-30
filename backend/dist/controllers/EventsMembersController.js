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
const EventsMembersService_1 = __importDefault(require("../services/EventsMembersService"));
class EventsMembersController {
    constructor() {
        this.assignUserToEvent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { eventId, assignedUserId } = req.body;
            const response = yield this.eventsMembersService.assignUserToEvent(eventId, assignedUserId, next);
            return res.status(200).json(response);
        });
        this.getEventMembers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.query;
            const response = yield this.eventsMembersService.getEventMembers(eventId, next);
            return res.status(200).json(response);
        });
        this.eventsMembersService = EventsMembersService_1.default.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventsMembersController();
        }
        return this.instance;
    }
}
EventsMembersController.instance = null;
exports.default = EventsMembersController;

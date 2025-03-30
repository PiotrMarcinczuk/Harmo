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
const EventService_1 = __importDefault(require("../services/EventService"));
class EventController {
    constructor() {
        this.createEvent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //   const validationError = new Error("Validation failed");
            //   (validationError as any).status = 400;
            //   (validationError as any).errors = errors.array();
            //   return next(validationError);
            // }
            const result = yield this.eventService.createEvent(req, res, next);
            return res.status(201).json(result);
        });
        this.updateEvent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //   return res.status(400).json({ errors: errors.array() });
            // }
            const result = yield this.eventService.updateEvent(req, res, next);
            return res.status(200).json(result);
        });
        this.getEvents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.eventService.getEvents(req, res, next);
            return res.status(200).json(result);
        });
        this.getEventsWithoutCalendar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.eventService.getEventsWithoutCalendar(req, res, next);
            return res.status(200).json(result);
        });
        this.getEventsOnlyForUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.eventService.getEventsOnlyForUser(req, res, next);
            return res.status(200).json(result);
        });
        this.getUpcomingEvents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId, timetableId } = req.query;
            const result = yield this.eventService.getUpcomingEvents(Number(userId), Number(timetableId), next);
            return res.status(200).json(result);
        });
        this.removeEvent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { eventId } = req.query;
            yield this.eventService.removeEvent(Number(eventId), next);
            return res.status(200).send("Event removed");
        });
        this.eventService = EventService_1.default.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventController();
        }
        return this.instance;
    }
}
EventController.instance = null;
exports.default = EventController;

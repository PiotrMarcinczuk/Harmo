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
const EventModel_1 = __importDefault(require("../models/EventModel"));
const EventMembers_1 = __importDefault(require("../models/EventMembers"));
const sequelize_1 = require("sequelize");
const exception_1 = __importDefault(require("../exceptions/exception"));
class EventService {
    constructor() {
        this.updateEvent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return { errors: errors.array() };
            }
            const { timetableId, eventName, startTime, endTime, description, isEventGroup = false, assignedUsersId, eventId, } = req.body;
            const userId = req.user.userId;
            if (!timetableId || !eventId) {
                const errors = {
                    timetableId: !timetableId,
                    eventId: !eventId,
                };
                const error = new exception_1.default(422, "Missing required fields: timetableId, eventId", errors);
                next(error);
            }
            try {
                yield EventModel_1.default.update({
                    timetable_id: timetableId,
                    event_name: eventName,
                    start_time: startTime,
                    end_time: endTime,
                    description,
                    user_id: userId,
                    is_event_group: isEventGroup,
                }, {
                    where: { event_id: eventId },
                });
                if (assignedUsersId && assignedUsersId.length) {
                    const current = yield EventMembers_1.default.findAll({
                        where: { event_id: eventId },
                    });
                    const currentUsers = current.map((user) => user.user_id);
                    const userToRemove = currentUsers.filter((userId) => !assignedUsersId.includes(userId));
                    if (userToRemove.length > 0) {
                        yield EventMembers_1.default.destroy({
                            where: {
                                event_id: eventId,
                                user_id: {
                                    [sequelize_1.Op.in]: userToRemove,
                                },
                            },
                        });
                    }
                    const userToAdd = assignedUsersId.filter((userId) => !currentUsers.includes(userId));
                    if (userToAdd.length > 0) {
                        const newMembers = userToAdd.map((userId) => ({
                            event_id: eventId,
                            user_id: userId,
                        }));
                        yield EventMembers_1.default.bulkCreate(newMembers, { returning: true });
                    }
                }
                else {
                    yield EventMembers_1.default.destroy({
                        where: { event_id: eventId },
                    });
                }
                return { message: "Event updated" };
            }
            catch (error) {
                next(error);
            }
        });
        this.getEvents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { timetableId } = req.query;
            if (!timetableId) {
                const error = new exception_1.default(422, "Missing required fields: timetableId");
                next(error);
            }
            try {
                const eventsResult = yield EventModel_1.default.findAll({
                    where: { timetable_id: timetableId },
                });
                const currentYear = new Date().getFullYear();
                let starYearDate = new Date(currentYear, 0, 2);
                const daysInYear = this.isLeapYear(starYearDate) ? 366 : 365;
                const newPages = [];
                for (let i = 0; i < daysInYear; i++) {
                    const next = new Date(starYearDate);
                    const isoString = next.toISOString();
                    const obj = {
                        date: isoString,
                        events: [],
                    };
                    newPages.push(obj);
                    starYearDate.setDate(starYearDate.getDate() + 1);
                }
                for (const event of eventsResult) {
                    const eventDate = new Date(event.start_time)
                        .toISOString()
                        .split("T")[0];
                    yield Promise.all(newPages.map((page) => __awaiter(this, void 0, void 0, function* () {
                        const pageDate = page.date.split("T")[0];
                        if (eventDate === pageDate) {
                            page.events.push(event);
                            const membersResult = yield EventMembers_1.default.findAll({
                                where: {
                                    event_id: event.event_id,
                                },
                            });
                            const userIds = membersResult.map((member) => member.user_id);
                            page.userIds = page.userIds || [];
                            page.userIds = [...new Set([...page.userIds, ...userIds])];
                        }
                    })));
                }
                return { calendar: newPages };
            }
            catch (error) {
                next(error);
            }
        });
        this.getEventsWithoutCalendar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { timetableId } = req.query;
            if (!timetableId) {
                const error = new exception_1.default(422, "Timetable ID is required to fetch events.");
                next(error);
            }
            const newPages = [];
            try {
                const result = yield EventModel_1.default.findAll({
                    where: { timetable_id: timetableId },
                    order: [["start_time", "DESC"]],
                });
                for (const event of result) {
                    const membersResult = yield EventMembers_1.default.findAll({
                        where: {
                            event_id: event.event_id,
                        },
                    });
                    const userIds = membersResult.map((member) => member.user_id);
                    const eventWithMembers = Object.assign(Object.assign({}, event.get({ plain: true })), { userIds });
                    newPages.push(eventWithMembers);
                }
                return newPages;
            }
            catch (error) {
                next(error);
            }
        });
        this.getEventsOnlyForUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { timetableId, userId } = req.query;
            if (!timetableId) {
                const error = new exception_1.default(422, "Missing required fields: timetableId, userId");
                next(error);
            }
            try {
                const eventsFromTimetable = yield EventModel_1.default.findAll({
                    where: { timetable_id: timetableId },
                });
                const eventIds = eventsFromTimetable.map((event) => event.event_id);
                if (eventIds.length === 0) {
                    return null;
                }
                const eventIdsForCollaborator = yield EventMembers_1.default.findAll({
                    where: {
                        event_id: {
                            [sequelize_1.Op.in]: eventIds,
                        },
                        user_id: userId,
                    },
                });
                const collaboratorEventIds = eventIdsForCollaborator.map((event) => event.event_id);
                const eventDetails = yield EventModel_1.default.findAll({
                    where: {
                        event_id: {
                            [sequelize_1.Op.in]: collaboratorEventIds,
                        },
                    },
                });
                return eventDetails;
            }
            catch (error) {
                next(error);
            }
        });
        this.getUpcomingEvents = (userId, timetableId, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId || !timetableId) {
                    const error = new exception_1.default(422, "User ID and timetable ID are required to fetch upcoming events.");
                    next(error);
                }
                const result = yield EventModel_1.default.findAll({
                    include: [
                        {
                            association: "event_members",
                            where: { user_id: userId },
                            required: true,
                        },
                    ],
                    where: {
                        timetable_id: timetableId,
                        start_time: {
                            [sequelize_1.Op.gt]: new Date(), // Pobiera tylko wydarzenia, których start_time jest w przyszłości
                        },
                    },
                    limit: 5,
                });
                return result;
            }
            catch (error) {
                next(error);
            }
        });
        this.removeEvent = (eventId, next) => __awaiter(this, void 0, void 0, function* () {
            if (!eventId) {
                const error = new exception_1.default(422, "Event ID is required to remove the event.");
                next(error);
            }
            try {
                yield EventMembers_1.default.destroy({
                    where: { event_id: eventId },
                });
                yield EventModel_1.default.destroy({
                    where: { event_id: eventId },
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.isLeapYear = (year) => {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        };
        this.changeDate = (dayNumber) => {
            if (dayNumber === 0)
                return 6;
            return dayNumber - 1;
        };
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventService();
        }
        return this.instance;
    }
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { timetableId, eventName, startTime, endTime, description, isEventGroup, assignedUsersId, userId, } = req.body;
                // if (!eventName || !startTime || !endTime) {
                //   const errors = {
                //     eventName: !eventName,
                //     startTime: !startTime,
                //     endTime: !endTime,
                //   };
                //   const error = new HttpException(
                //     422,
                //     "Missing required fields: eventName, startTime, endTime",
                //     errors
                //   );
                //   next(error);
                // }
                const event = yield EventModel_1.default.create({
                    timetable_id: timetableId,
                    event_name: eventName,
                    start_time: startTime,
                    end_time: endTime,
                    description,
                    user_id: userId,
                    is_event_group: isEventGroup,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                if (assignedUsersId && assignedUsersId.length) {
                    const newMembers = assignedUsersId.map((userId) => ({
                        event_id: event.event_id,
                        user_id: userId,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }));
                    yield EventMembers_1.default.bulkCreate(newMembers, { returning: true });
                }
                return event;
            }
            catch (err) {
                next(err);
            }
        });
    }
}
EventService.instance = null;
exports.default = EventService;

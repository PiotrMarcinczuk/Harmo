"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
// @ts-ignore
const router_1 = __importDefault(require("./router"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const authMiddleware_2 = require("../middleware/authMiddleware");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const EventController_1 = __importDefault(require("../controllers/EventController"));
const TimetableController_1 = __importDefault(require("../controllers/TimetableController"));
const userUpdateValidation_1 = require("../validation/userUpdateValidation");
const user = UserController_1.default.getInstance();
const event = EventController_1.default.getInstance();
const timetable = TimetableController_1.default.getInstance();
router_1.default.post("/logout", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, (req, res) => {
    user.logout(req, res);
});
router_1.default.get("/user", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, (req, res, next) => {
    user.getUser(req, res, next);
});
router_1.default.get("/get-events", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, authMiddleware_2.checkIsUserInTimetable, (req, res, next) => {
    event.getEvents(req, res, next);
});
router_1.default.get("/get-upcoming-events", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, authMiddleware_2.checkIsUserInTimetable, (req, res, next) => {
    event.getUpcomingEvents(req, res, next);
});
router_1.default.get("/get-events-user", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, authMiddleware_2.checkIsUserInTimetable, (req, res, next) => {
    event.getEventsOnlyForUser(req, res, next);
});
router_1.default.get("/get-collaborators-for-event", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, authMiddleware_2.checkIsUserInTimetable, (req, res, next) => {
    user.getCollaboratorsForEvent(req, res, next);
});
router_1.default.get("/get-collaborators", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, authMiddleware_2.checkIsUserInTimetable, (req, res, next) => {
    user.getCollaborators(req, res, next);
});
router_1.default.get("/get-timetables", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, (req, res, next) => {
    timetable.getTimetables(req, res, next);
});
router_1.default.get("/get-timetable", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, authMiddleware_2.checkIsUserInTimetable, (req, res, next) => {
    timetable.getTimetableById(req, res, next);
});
router_1.default.get("/get-timetables-collaborator", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, (req, res, next) => {
    timetable.getTimetablesForCollaborator(req, res, next);
});
router_1.default.patch("/update-user", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, userUpdateValidation_1.userUpdateValidationRules, userUpdateValidation_1.validateUserUpdate, (req, res, next) => {
    user.updateUser(req, res, next);
});
exports.default = router_1.default;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
require("dotenv").config();
const authMiddleware_1 = require("../middleware/authMiddleware");
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const EventController_1 = __importDefault(require("../controllers/EventController"));
const eventsMembersController_1 = __importDefault(require("../controllers/eventsMembersController"));
const TimetableController_1 = __importDefault(require("../controllers/TimetableController"));
const userValidation_1 = require("../validation/userValidation");
const eventValidation_1 = require("../validation/eventValidation");
const timetableValidation_1 = require("../validation/timetableValidation");
const user = UserController_1.default.getInstance();
const event = EventController_1.default.getInstance();
const eventsMembers = eventsMembersController_1.default.getInstance();
const timetable = TimetableController_1.default.getInstance();
router_1.default.post("/create-timetable", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, timetableValidation_1.timetableValidationRules, timetableValidation_1.validateTimetable, (req, res, next) => {
    timetable.createTimetable(req, res, next);
});
// router.get(
//   "/get-timetables",
//   authenticateToken,
//   checkTokenOwnership,
//   checkTimetableOwnership,
//   (req, res) => {
//     timetable.getTimetables(req, res);
//   }
// );
// router.get(
//   "/get-timetable",
//   authenticateToken,
//   checkTokenOwnership,
//   checkTimetableOwnership,
//   (req, res) => {
//     timetable.getTimetableById(req, res);
//   }
// );
router_1.default.post("/create-event", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, eventValidation_1.eventValidationRules, eventValidation_1.validateEvent, (req, res, next) => {
    event.createEvent(req, res, next);
});
router_1.default.get("/get-events-list", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, (req, res, next) => {
    event.getEventsWithoutCalendar(req, res, next);
});
router_1.default.delete("/remove-event", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, (req, res, next) => {
    event.removeEvent(req, res, next);
});
router_1.default.patch("/update-event", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, eventValidation_1.eventValidationRules, eventValidation_1.validateEvent, (req, res, next) => {
    event.updateEvent(req, res, next);
});
router_1.default.post("/create-assign", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, (req, res, next) => {
    eventsMembers.assignUserToEvent(req, res, next);
});
router_1.default.get("/get-members", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, (req, res, next) => {
    eventsMembers.getEventMembers(req, res, next);
});
router_1.default.post("/create-collaborator", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, userValidation_1.userValidationRules, userValidation_1.validateUser, (req, res, next) => {
    user.createUser(req, res, next);
});
router_1.default.get("/get-user-by-id", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, (req, res, next) => {
    user.getUserById(req, res, next);
});
router_1.default.delete("/remove-user", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, (req, res, next) => {
    user.removeUser(req, res, next);
});
router_1.default.post("/add-user-to-timetable", authMiddleware_1.authenticateToken, authMiddleware_1.checkTokenOwnership, adminMiddleware_1.checkTimetableOwnership, (req, res, next) => {
    user.addCollaborator(req, res, next);
});
exports.default = router_1.default;

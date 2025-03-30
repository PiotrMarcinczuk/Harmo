import { NextFunction } from "express";
import router from "./router";
require("dotenv").config();
// @ts-ignore
import { refreshToken, test } from "../controllers/AuthController";
import {
  authenticateToken,
  checkTokenOwnership,
} from "../middleware/authMiddleware";
import { checkTimetableOwnership } from "../middleware/adminMiddleware";
import UserController from "../controllers/UserController";
import EventController from "../controllers/EventController";
import EventsMembersController from "../controllers/eventsMembersController";
import TimetableController from "../controllers/TimetableController";
import {
  validateUser,
  userValidationRules,
} from "../validation/userValidation";
import {
  eventValidationRules,
  validateEvent,
} from "../validation/eventValidation";
import {
  timetableValidationRules,
  validateTimetable,
} from "../validation/timetableValidation";

const user = UserController.getInstance();
const event = EventController.getInstance();
const eventsMembers = EventsMembersController.getInstance();
const timetable = TimetableController.getInstance();

router.post(
  "/create-timetable",
  authenticateToken,
  checkTokenOwnership,
  timetableValidationRules,
  validateTimetable,
  (req: any, res: any, next: NextFunction) => {
    timetable.createTimetable(req, res, next);
  }
);
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

router.post(
  "/create-event",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  eventValidationRules,
  validateEvent,

  (req: any, res: any, next: NextFunction) => {
    event.createEvent(req, res, next);
  }
);
router.get(
  "/get-events-list",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  (req, res, next: NextFunction) => {
    event.getEventsWithoutCalendar(req, res, next);
  }
);
router.delete(
  "/remove-event",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  (req, res, next: NextFunction) => {
    event.removeEvent(req, res, next);
  }
);
router.patch(
  "/update-event",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  eventValidationRules,
  validateEvent,
  (req: any, res: any, next: NextFunction) => {
    event.updateEvent(req, res, next);
  }
);

router.post(
  "/create-assign",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  (req, res, next: NextFunction) => {
    eventsMembers.assignUserToEvent(req, res, next);
  }
);

router.get(
  "/get-members",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  (req, res, next: NextFunction) => {
    eventsMembers.getEventMembers(req, res, next);
  }
);

router.post(
  "/create-collaborator",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  userValidationRules,
  validateUser,
  (req: any, res: any, next: NextFunction) => {
    user.createUser(req, res, next);
  }
);

router.get(
  "/get-user-by-id",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  (req, res, next: NextFunction) => {
    user.getUserById(req, res, next);
  }
);

router.delete(
  "/remove-user",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  (req, res, next: NextFunction) => {
    user.removeUser(req, res, next);
  }
);
router.post(
  "/add-user-to-timetable",
  authenticateToken,
  checkTokenOwnership,
  checkTimetableOwnership,
  (req, res, next: NextFunction) => {
    user.addCollaborator(req, res, next);
  }
);

export default router;

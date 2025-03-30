import { NextFunction, Router } from "express";
require("dotenv").config();
// @ts-ignore
import router from "./router";
import {
  authenticateToken,
  checkTokenOwnership,
} from "../middleware/authMiddleware";
import { checkIsUserInTimetable } from "../middleware/authMiddleware";
import cors from "cors";
import UserController from "../controllers/UserController";
import EventController from "../controllers/EventController";
import TimetableController from "../controllers/TimetableController";
import {
  userUpdateValidationRules,
  validateUserUpdate,
} from "../validation/userUpdateValidation";

const user = UserController.getInstance();
const event = EventController.getInstance();
const timetable = TimetableController.getInstance();

router.post("/logout", authenticateToken, checkTokenOwnership, (req, res) => {
  user.logout(req, res);
});
router.get(
  "/user",
  authenticateToken,
  checkTokenOwnership,
  (req, res, next: NextFunction) => {
    user.getUser(req, res, next);
  }
);

router.get(
  "/get-events",
  authenticateToken,
  checkTokenOwnership,
  checkIsUserInTimetable,
  (req, res, next: NextFunction) => {
    event.getEvents(req, res, next);
  }
);
router.get(
  "/get-upcoming-events",
  authenticateToken,
  checkTokenOwnership,
  checkIsUserInTimetable,
  (req, res, next: NextFunction) => {
    event.getUpcomingEvents(req, res, next);
  }
);

router.get(
  "/get-events-user",
  authenticateToken,
  checkTokenOwnership,
  checkIsUserInTimetable,
  (req, res, next: NextFunction) => {
    event.getEventsOnlyForUser(req, res, next);
  }
);

router.get(
  "/get-collaborators-for-event",
  authenticateToken,
  checkTokenOwnership,
  checkIsUserInTimetable,
  (req, res, next: NextFunction) => {
    user.getCollaboratorsForEvent(req, res, next);
  }
);

router.get(
  "/get-collaborators",
  authenticateToken,
  checkTokenOwnership,
  checkIsUserInTimetable,
  (req, res, next: NextFunction) => {
    user.getCollaborators(req, res, next);
  }
);

router.get(
  "/get-timetables",
  authenticateToken,
  checkTokenOwnership,
  (req, res, next: NextFunction) => {
    timetable.getTimetables(req, res, next);
  }
);
router.get(
  "/get-timetable",
  authenticateToken,
  checkTokenOwnership,
  checkIsUserInTimetable,
  (req, res, next: NextFunction) => {
    timetable.getTimetableById(req, res, next);
  }
);

router.get(
  "/get-timetables-collaborator",
  authenticateToken,
  checkTokenOwnership,
  (req, res, next: NextFunction) => {
    timetable.getTimetablesForCollaborator(req, res, next);
  }
);

router.patch(
  "/update-user",
  authenticateToken,
  checkTokenOwnership,
  userUpdateValidationRules,
  validateUserUpdate,
  (req: any, res: any, next: NextFunction) => {
    user.updateUser(req, res, next);
  }
);

export default router;

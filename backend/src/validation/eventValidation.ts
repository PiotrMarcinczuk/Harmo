import { validationResult, check } from "express-validator";
import HttpException from "../exceptions/exception";
export const eventValidationRules = [
  check("eventName").trim().notEmpty().withMessage("Event name is required"),
  check("eventName").custom((value) => {
    if (value.length > 25) {
      throw new Error("Event name must be less than 25 characters");
    }
    return true;
  }),
  check("startTime").trim().notEmpty().withMessage("Start time is required"),
  check("endTime").trim().notEmpty().withMessage("End time is required"),
  check("startTime").custom((value, { req }) => {
    if (value >= req.body.endTime) {
      throw new Error("Start time must be before end time");
    }
    return true;
  }),
  check("startTime").custom((value) => {
    const startDate = new Date(value);
    const dayOfWeek = startDate.getUTCDay();
    if (value.length < 13) {
      throw new Error("Start time is required");
    }

    return true;
  }),
  check("endTime").custom((value) => {
    const endDate = new Date(value);
    const dayOfWeek = endDate.getUTCDay();
    if (value.length < 13) {
      throw new Error("End time is required");
    }

    return true;
  }),
];

export const validateEvent = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpException(422, "Validation failed", errors.array());
    next(error);
  } else {
    next();
  }
};

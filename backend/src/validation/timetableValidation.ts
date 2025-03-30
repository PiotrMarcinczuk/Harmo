import { validationResult, check } from "express-validator";

export const timetableValidationRules = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 40 }),
];

export const validateTimetable = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

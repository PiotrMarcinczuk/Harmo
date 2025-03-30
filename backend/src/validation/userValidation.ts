import { validationResult, check } from "express-validator";
import User from "../models/User";
import HttpException from "../exceptions/exception";
export const userValidationRules = [
  check("name").trim().notEmpty().withMessage("Name is required"),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Email is required and must be unique")
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error("Email is already in use");
      }
      return true;
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
  check("dateOfBirth")
    .trim()
    .notEmpty()
    .withMessage("Date of birth is required")
    .custom((value) => {
      const today = new Date();
      const dateOfBirth = new Date(value);
      if (dateOfBirth > today) {
        throw new Error("Date of birth cannot be in the future");
      }
      return true;
    }),
  check("surname").trim().notEmpty().withMessage("Surname is required"),
  check("nickname")
    .trim()
    .notEmpty()
    .isLength({ max: 15 })
    .withMessage("Nickname is required"),
  check("phone")
    .trim()
    .notEmpty()
    .isLength({ max: 9 })
    .withMessage("Phone is required")
    .isNumeric()
    .withMessage("Phone must be a numeric string"),
  check("repeatPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password || value === "") {
        throw new Error("Passwords must match");
      }
      return true;
    })
    .withMessage("Passwords must match"),
];

export const validateUser = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpException(422, "Validation failed", errors.array());
    next(error);
  } else {
    next();
  }
};

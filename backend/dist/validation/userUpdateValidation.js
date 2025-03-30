"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdate = exports.userUpdateValidationRules = void 0;
const express_validator_1 = require("express-validator");
const exception_1 = __importDefault(require("../exceptions/exception"));
exports.userUpdateValidationRules = [
    (0, express_validator_1.check)("name").trim().notEmpty().withMessage("Name is required"),
    (0, express_validator_1.check)("email").trim().isEmail().withMessage("Email is required"),
    (0, express_validator_1.check)("password")
        .optional()
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
    (0, express_validator_1.check)("dateOfBirth")
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
    (0, express_validator_1.check)("surname").trim().notEmpty().withMessage("Surname is required"),
    (0, express_validator_1.check)("nickname")
        .trim()
        .notEmpty()
        .isLength({ max: 15 })
        .withMessage("Nickname is required"),
    (0, express_validator_1.check)("phone")
        .trim()
        .notEmpty()
        .isLength({ max: 9 })
        .withMessage("Phone is required")
        .isNumeric()
        .withMessage("Phone must be a numeric string"),
    (0, express_validator_1.check)("repeatPassword")
        .custom((value, { req }) => {
        if (value !== req.body.password || value === "") {
            throw new Error("Passwords must match");
        }
        return true;
    })
        .withMessage("Passwords must match"),
];
const validateUserUpdate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new exception_1.default(422, "Validation failed", errors.array());
        next(error);
    }
    else {
        next();
    }
};
exports.validateUserUpdate = validateUserUpdate;

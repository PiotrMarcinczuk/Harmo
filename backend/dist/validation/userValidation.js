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
exports.validateUser = exports.userValidationRules = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const exception_1 = __importDefault(require("../exceptions/exception"));
exports.userValidationRules = [
    (0, express_validator_1.check)("name").trim().notEmpty().withMessage("Name is required"),
    (0, express_validator_1.check)("email")
        .trim()
        .isEmail()
        .withMessage("Email is required and must be unique")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield User_1.default.findOne({ where: { email: value } });
        if (existingUser) {
            throw new Error("Email is already in use");
        }
        return true;
    })),
    (0, express_validator_1.check)("password")
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
const validateUser = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new exception_1.default(422, "Validation failed", errors.array());
        next(error);
    }
    else {
        next();
    }
};
exports.validateUser = validateUser;

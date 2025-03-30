"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEvent = exports.eventValidationRules = void 0;
const express_validator_1 = require("express-validator");
const exception_1 = __importDefault(require("../exceptions/exception"));
exports.eventValidationRules = [
    (0, express_validator_1.check)("eventName").trim().notEmpty().withMessage("Event name is required"),
    (0, express_validator_1.check)("eventName").custom((value) => {
        if (value.length > 25) {
            throw new Error("Event name must be less than 25 characters");
        }
        return true;
    }),
    (0, express_validator_1.check)("startTime").trim().notEmpty().withMessage("Start time is required"),
    (0, express_validator_1.check)("endTime").trim().notEmpty().withMessage("End time is required"),
    (0, express_validator_1.check)("startTime").custom((value, { req }) => {
        if (value >= req.body.endTime) {
            throw new Error("Start time must be before end time");
        }
        return true;
    }),
    (0, express_validator_1.check)("startTime").custom((value) => {
        const startDate = new Date(value);
        const dayOfWeek = startDate.getUTCDay();
        if (value.length < 13) {
            throw new Error("Start time is required");
        }
        return true;
    }),
    (0, express_validator_1.check)("endTime").custom((value) => {
        const endDate = new Date(value);
        const dayOfWeek = endDate.getUTCDay();
        if (value.length < 13) {
            throw new Error("End time is required");
        }
        return true;
    }),
];
const validateEvent = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new exception_1.default(422, "Validation failed", errors.array());
        next(error);
    }
    else {
        next();
    }
};
exports.validateEvent = validateEvent;

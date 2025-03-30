"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTimetable = exports.timetableValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.timetableValidationRules = [
    (0, express_validator_1.check)("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ max: 40 }),
];
const validateTimetable = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    next();
};
exports.validateTimetable = validateTimetable;

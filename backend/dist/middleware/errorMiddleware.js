"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorMiddleware;
const constant_1 = require("../constants/constant");
function errorMiddleware(error, req, res, next) {
    const status = error.status ? error.status : 500;
    const message = status === 500 ? constant_1.APP_ERROR_MESSAGE.serverError : error.message;
    const errors = error.error;
    console.log("errorMiddleware", status, message, errors);
    res.status(status).send({ status, message, error: errors });
}

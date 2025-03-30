"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message, error = {}) {
        super(message);
        this.status = status;
        this.error = error;
    }
}
exports.default = HttpException;

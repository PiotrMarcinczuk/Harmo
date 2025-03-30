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
const AuthService_1 = __importDefault(require("../services/AuthService"));
class AuthController {
    constructor() {
        this.authService = AuthService_1.default.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthController();
        }
        return this.instance;
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.register(req, res, next);
            return res.status(200).json(result);
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.login(req, res, next);
            return res.status(200).json(result);
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.refresh(req, res, next);
            return res.status(200).json(result);
        });
    }
}
AuthController.instance = null;
exports.default = AuthController;

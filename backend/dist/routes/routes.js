"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const router_1 = __importDefault(require("./router"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const userValidation_1 = require("../validation/userValidation");
const auth = AuthController_1.default.getInstance();
router_1.default.post("/register", userValidation_1.userValidationRules, userValidation_1.validateUser, (req, res, next) => {
    auth.register(req, res, next);
});
router_1.default.post("/login", (req, res, next) => {
    auth.login(req, res, next);
});
router_1.default.post("/refresh", (req, res, next) => {
    auth.refresh(req, res, next);
});
exports.default = router_1.default;

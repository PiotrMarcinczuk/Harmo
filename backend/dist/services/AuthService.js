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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const exception_1 = __importDefault(require("../exceptions/exception"));
const userValidation_1 = require("../validation/userValidation");
class AuthService {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, repeatPassword, dateOfBirth, surname, nickname, phone, isAdmin, } = req.body;
            try {
                yield User_1.default.create({
                    name: name,
                    surname: surname,
                    email: email,
                    phone: phone,
                    password_hash: yield bcrypt_1.default.hash(password, 10),
                    nickname: nickname,
                    is_admin: true,
                    date_of_birth: dateOfBirth,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                return { message: "User created successfully." };
            }
            catch (err) {
                const errors = (0, userValidation_1.validateUser)(req, res, next);
                if (errors) {
                    return errors;
                }
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const errors = [];
            try {
                const user = yield User_1.default.findOne({ where: { email: email } });
                if (!user) {
                    const error = new exception_1.default(404, "User with this email does not exist. Please try again.", { email: true, password: true, repeatPassword: true });
                    next(error);
                }
                else {
                    const validPassword = yield bcrypt_1.default.compare(password, user.password_hash);
                    if (!validPassword) {
                        const error = new exception_1.default(404, "Password is incorrect. Please try again.", { email: false, password: true, repeatPassword: true });
                        next(error);
                    }
                    if (validPassword) {
                        const _a = user.get({
                            plain: true,
                        }), { password_hash } = _a, userWithoutPassword = __rest(_a, ["password_hash"]);
                        const accessToken = this.generateToken(userWithoutPassword);
                        const refreshToken = this.generateRefreshToken(userWithoutPassword);
                        res.cookie("accessToken", accessToken, {
                            httpOnly: true, // Prevents JavaScript access to the cookie
                            sameSite: "None",
                            secure: true,
                            maxAge: 3 * 60 * 1000, // Cookie expiration time in milliseconds (3 minutes)
                        });
                        res.cookie("refreshAccessToken", refreshToken, {
                            httpOnly: true, // Prevents JavaScript access to the cookie
                            sameSite: "None",
                            secure: true,
                            maxAge: 3 * 60 * 1000 * 20 * 72, // Cookie expiration time in milliseconds (3 minutes)
                        });
                        return { user: userWithoutPassword, accessToken, refreshToken };
                    }
                }
                // if (errors.length > 0) {
                //   return errors;
                // }
            }
            catch (err) {
                next(err);
            }
        });
        this.refresh = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshAccessToken;
            if (!refreshToken) {
                const error = new exception_1.default(422, "Do not have refresh token. Please login again.");
                next(error);
            }
            const secretRefresh = process.env.JWT_SECRET_REFRESH;
            jsonwebtoken_1.default.verify(refreshToken, secretRefresh, (err, user) => {
                if (err) {
                    next(err);
                }
                const secret = process.env.JWT_SECRET;
                const accessToken = jsonwebtoken_1.default.sign({ userId: user.userId, email: user.email }, secret);
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                    maxAge: 3 * 60 * 1000, // 3 minutes
                });
                return { accessToken }; // Send the new access token as a response
            });
        });
        this.generateToken = (user) => {
            const secret = process.env.JWT_SECRET;
            return jsonwebtoken_1.default.sign({
                userId: user.user_id,
                email: user.email,
                isAdmin: user.is_admin,
            }, secret);
        };
        this.generateRefreshToken = (user) => {
            const secret = process.env.JWT_SECRET_REFRESH;
            return jsonwebtoken_1.default.sign({
                userId: user.user_id,
                email: user.email,
            }, secret);
        };
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }
}
AuthService.instance = null;
exports.default = AuthService;

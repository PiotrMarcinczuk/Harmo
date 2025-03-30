"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const routes_1 = __importDefault(require("./routes/routes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initMiddleware();
        this.initRoutes();
        this.listen();
    }
    static getInstance(port) {
        if (!this.instance) {
            this.instance = new App(port);
        }
        return this.instance;
    }
    initMiddleware() {
        dotenv_1.default.config();
        // this.app.use(
        //   cors({
        //     origin: process.env.ORIGIN, // Allow requests from this origin
        //     methods: ["GET", "POST", "DELETE", "PATCH"], // Allow these HTTP methods
        //     allowedHeaders: ["Content-Type", "Authorization"],
        //     credentials: true, // Allow credentials
        //   })
        // );
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
    }
    initRoutes() {
        this.app.use("/auth", authRoutes_1.default);
        this.app.use("/auth/admin", adminRoutes_1.default);
        this.app.use("/api", routes_1.default);
        this.app.use(errorMiddleware_1.default);
    }
    listen() {
        this.app.listen(this.port, "0.0.0.0", () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
App.instance = null;
// dotenv.config();
const appInstance = App.getInstance(parseInt(process.env.PORT, 10) || 8080);

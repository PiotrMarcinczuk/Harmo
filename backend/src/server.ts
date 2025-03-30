import dotenv from "dotenv";
import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import routes from "./routes/routes";
import errorMiddleware from "./middleware/errorMiddleware";

class App {
  private static instance: App | null = null;
  public app: express.Application;
  public port: number;

  private constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initMiddleware();
    this.initRoutes();
    this.listen();
  }

  public static getInstance(port: number) {
    if (!this.instance) {
      this.instance = new App(port);
    }
    return this.instance;
  }

  private initMiddleware() {
    dotenv.config();
    // this.app.use(
    //   cors({
    //     origin: process.env.ORIGIN, // Allow requests from this origin
    //     methods: ["GET", "POST", "DELETE", "PATCH"], // Allow these HTTP methods
    //     allowedHeaders: ["Content-Type", "Authorization"],
    //     credentials: true, // Allow credentials
    //   })
    // );

    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initRoutes() {
    this.app.use("/auth", authRoutes);
    this.app.use("/auth/admin", adminRoutes);
    this.app.use("/api", routes);
    this.app.use(errorMiddleware);
  }

  private listen() {
    this.app.listen(this.port, "0.0.0.0", () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
// dotenv.config();

const appInstance = App.getInstance(
  parseInt(process.env.PORT as string, 10) || 8080
);

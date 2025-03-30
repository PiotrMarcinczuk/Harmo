import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import EventModel from "../models/EventModel";
import User from "../models/User";
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.ADMIN,
  password: process.env.PASSWORD,
  host: process.env.DB_HOST, // CHANGE THIS
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

export default sequelize;

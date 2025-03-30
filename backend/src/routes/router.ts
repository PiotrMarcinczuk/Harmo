import express from "express";
import cors from "cors";
require("dotenv").config();
const router = express.Router();

router.use(
  cors({
    origin: process.env.ORIGIN, // Allow requests from this origin
    methods: ["GET", "POST", "DELETE", "PATCH"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials
  })
);

export default router;

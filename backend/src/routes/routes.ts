require("dotenv").config();
import router from "./router";
import AuthController from "../controllers/AuthController";
import {
  validateUser,
  userValidationRules,
} from "../validation/userValidation";
import { NextFunction } from "express";

const auth = AuthController.getInstance();

router.post(
  "/register",
  userValidationRules,
  validateUser,
  (req: any, res: any, next: NextFunction) => {
    auth.register(req, res, next);
  }
);
router.post("/login", (req, res, next: NextFunction) => {
  auth.login(req, res, next);
});
router.post("/refresh", (req, res, next: NextFunction) => {
  auth.refresh(req, res, next);
});

export default router;

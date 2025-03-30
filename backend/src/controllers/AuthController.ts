import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { validationResult, check } from "express-validator";
import AuthService from "../services/AuthService";
import { NextFunction } from "express";

class AuthController {
  private static instance: AuthController | null = null;
  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new AuthController();
    }
    return this.instance;
  }

  async register(req: any, res: any, next: NextFunction) {
    const result = await this.authService.register(req, res, next);
    return res.status(200).json(result);
  }

  async login(req: any, res: any, next: NextFunction) {
    const result = await this.authService.login(req, res, next);
    return res.status(200).json(result);
  }

  async refresh(req: any, res: any, next: NextFunction) {
    const result = await this.authService.refresh(req, res, next);
    return res.status(200).json(result);
  }
}

export default AuthController;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { Request, Response } from "express";
import { validationResult, check } from "express-validator";
import UserService from "../services/UserService";
import { NextFunction } from "express";
import { time } from "console";

class UserController {
  private static instance: UserController | null = null;
  private userService: UserService;

  private constructor() {
    this.userService = UserService.getInstance();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserController();
    }
    return this.instance;
  }

  async getUser(req: any, res: any, next: NextFunction) {
    const { userId } = req.user;

    const user = await this.userService.getUser(userId, next);
    return res.status(200).json(user);
  }

  async getCollaborators(req: Request, res: Response, next: NextFunction) {
    const { timetableId, userId } = req.query;

    const collaborators = await this.userService.getCollaborators(
      Number(timetableId),
      Number(userId),
      next
    );

    return res.status(200).json(collaborators);
  }

  async getCollaboratorsForEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { eventId } = req.query;
    const result = await this.userService.getCollaboratorsForEvent(
      Number(eventId),
      next
    );
    return res.status(200).json(result);
  }

  async logout(req: Request, res: Response) {
    await this.userService.logout(req, res);
    return res.status(201).json({ message: "Logged out" });
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.createUser(req, res, next);
    return res.status(201).json(result);
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const { targetUserId } = req.query;

    const result = await this.userService.getUserById(
      Number(targetUserId),
      next
    );
    return res.status(200).json(result);
  }

  async removeUser(req: Request, res: Response, next: NextFunction) {
    const { removedUserId, timetableId } = req.body;

    const result = await this.userService.removeUser(
      Number(removedUserId),
      Number(timetableId),
      next
    );
    return res.status(201).json(result);
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.updateUser(req, res, next);
    return res.status(200).json(result);
  }

  async addCollaborator(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.addCollaborator(req, res, next);
    if (result) return res.status(200).json(result);
  }
}

export default UserController;

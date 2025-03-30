import time from "console";
import pool from "../config/db";
import { validationResult, check } from "express-validator";
import TimetableService from "../services/TimetableService";
import { NextFunction } from "express";

class TimetableController {
  private static instance: TimetableController | null = null;
  private timetableService: TimetableService;

  private constructor() {
    this.timetableService = TimetableService.getInstance();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TimetableController();
    }
    return this.instance;
  }

  createTimetable = async (req: any, res: any, next: NextFunction) => {
    const response = await this.timetableService.createTimetable(
      req,
      res,
      next
    );
    res.status(201).json(response);
  };

  assignToTimetable = async (req: any, res: any, next: NextFunction) => {
    const { collaboratorId, timetableId } = req.body;
    const response = await this.timetableService.assignToTimetable(
      collaboratorId,
      timetableId,
      next
    );
    res.status(201).json(response);
  };

  getTimetables = async (req: any, res: any, next: NextFunction) => {
    const { userId } = req.query;

    const response = await this.timetableService.getTimetables(userId, next);
    res.status(200).json(response);
  };

  getTimetableById = async (req: any, res: any, next: NextFunction) => {
    const { userId, timetableId } = req.query;

    const response = await this.timetableService.getTimetableById(
      userId,
      timetableId,
      next
    );
    res.status(200).json(response);
  };

  getTimetablesForCollaborator = async (
    req: any,
    res: any,
    next: NextFunction
  ) => {
    const { userId } = req.query;

    const response = await this.timetableService.getTimetablesForCollaborator(
      userId,
      next
    );
    res.status(200).json(response);
  };
}

export default TimetableController;

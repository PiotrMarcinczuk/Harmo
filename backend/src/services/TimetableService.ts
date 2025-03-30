import time from "console";
import sequelize from "../config/db";
import { validationResult, check } from "express-validator";
import Timetable from "../models/Timetable";
import UserTimetable from "../models/UserTimetable";
import { Op } from "sequelize";
import { NextFunction } from "express";
import HttpException from "../exceptions/exception";
class TimetableService {
  private static instance: TimetableService | null = null;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TimetableService();
    }
    return this.instance;
  }

  createTimetable = async (req: any, res: any, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpException(
        422,
        "Validation failed, entered data is incorrect."
      );

      next(error);
    }
    const { name } = req.body;
    const userId = req.user.userId;
    if (!name || !userId) {
      const error = new HttpException(
        422,
        "Timetable name and user ID are required."
      );

      next(error);
    }

    try {
      const existingTimetables = await Timetable.findAll({
        where: { user_id: userId },
      });

      if (existingTimetables.length >= 5) {
        const error = new HttpException(
          422,
          "You have reached the maximum number of timetables."
        );

        next(error);
      }
      const newTimetable = await Timetable.create({
        timetable_name: name,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await UserTimetable.create({
        user_id: userId,
        timetable_id: newTimetable.timetable_id,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return newTimetable;
    } catch (error) {
      next(error);
    }
  };

  assignToTimetable = async (
    collaboratorId: number,
    timetableId: number,
    next: NextFunction
  ) => {
    if (!collaboratorId || !timetableId) {
      const error = new HttpException(
        422,
        "Collaborator ID and Timetable ID are required."
      );

      next(error);
    }

    try {
      const result = await UserTimetable.create({
        collaborator_id: collaboratorId,
        timetable_id: timetableId,
      });

      return result;
    } catch (error) {
      next(error);
    }
  };

  getTimetables = async (userId: number, next: NextFunction) => {
    if (!userId) {
      const error = new HttpException(
        422,
        "User ID is required to fetch timetables."
      );

      next(error);
    }

    try {
      const result = await Timetable.findAll({
        where: { user_id: userId },
      });
      if (result.length > 0) return result;
      const resultForCollaborator = await UserTimetable.findAll({
        where: { user_id: userId },
        include: [
          {
            association: "timetables",

            required: true,
          },
        ],
      });
      return resultForCollaborator;
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  };

  getTimetableById = async (
    userId: number,
    timetableId: number,
    next: NextFunction
  ) => {
    if (!userId || !timetableId) {
      const error = new HttpException(
        422,
        "User ID and Timetable ID are required to fetch timetable."
      );

      next(error);
    }

    try {
      const result = await Timetable.findOne({
        where: { user_id: userId, timetable_id: timetableId },
      });

      return result;
    } catch (error) {
      next(error);
    }
  };

  getTimetablesForCollaborator = async (userId: number, next: NextFunction) => {
    if (!userId) {
      const error = new HttpException(
        422,
        "User ID is required to fetch timetables for collaborator."
      );

      next(error);
    }

    try {
      let result;
      const query = await UserTimetable.findAll({
        where: { user_id: userId },
      });

      if (query) {
        const timetableIds = query.map((row: any) => row.timetable_id);
        result = await Timetable.findAll({
          where: {
            timetable_id: {
              [Op.in]: timetableIds,
            },
          },
        });
      }
      console.log("result", result);
      return result;
    } catch (error) {
      next(error);
    }
  };
}

export default TimetableService;

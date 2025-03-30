import sequelize from "../config/db";
import { validationResult, check } from "express-validator";
import EventMembers from "../models/EventMembers";
import User from "../models/User";
import { Op } from "sequelize";
import { NextFunction } from "express";
import HttpException from "../exceptions/exception";

class EventsMembersService {
  private static instance: EventsMembersService | null = null;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new EventsMembersService();
    }
    return this.instance;
  }

  assignUserToEvent = async (
    eventId: number,
    assignedUserId: number,
    next: NextFunction
  ) => {
    if (!eventId || !assignedUserId) {
      const error = new HttpException(
        422,
        "Event ID and assigned user ID are required."
      );

      next(error);
    }
    try {
      const assign = await EventMembers.create({
        event_id: eventId,
        user_id: assignedUserId,
      });

      return assign;
    } catch (error) {
      next(error);
    }
  };

  getEventMembers = async (eventId: number, next: NextFunction) => {
    if (!eventId) {
      const error = new HttpException(422, "Event ID is required.");

      next(error);
    }

    try {
      const result = await EventMembers.findAll({
        where: { event_id: eventId },
      });
      const userIds = result.map((user: any) => user.user_id);
      const users = await User.findAll({
        where: {
          user_id: {
            [Op.in]: userIds,
          },
        },
      });

      users.forEach((user: any) => {
        delete user.password_hash;
      });
      return users;
    } catch (error) {
      next(error);
    }
  };
}

export default EventsMembersService;

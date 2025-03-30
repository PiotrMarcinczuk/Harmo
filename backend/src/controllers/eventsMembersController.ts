import pool from "../config/db";
import { validationResult, check } from "express-validator";
import EventsMembersService from "../services/EventsMembersService";
import { NextFunction } from "express";

class EventsMembersController {
  private static instance: EventsMembersController | null = null;
  private eventsMembersService: EventsMembersService;

  private constructor() {
    this.eventsMembersService = EventsMembersService.getInstance();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new EventsMembersController();
    }
    return this.instance;
  }

  assignUserToEvent = async (req: any, res: any, next: NextFunction) => {
    const { eventId, assignedUserId } = req.body;

    const response = await this.eventsMembersService.assignUserToEvent(
      eventId,
      assignedUserId,
      next
    );
    return res.status(200).json(response);
  };

  getEventMembers = async (req: any, res: any, next: NextFunction) => {
    const { eventId } = req.query;

    const response = await this.eventsMembersService.getEventMembers(
      eventId,
      next
    );
    return res.status(200).json(response);
  };
}

export default EventsMembersController;

import { NextFunction, Request, Response } from "express";
import EventService from "../services/EventService";
import { validationResult } from "express-validator";

class EventController {
  private static instance: EventController | null = null;
  private eventService: EventService;

  constructor() {
    this.eventService = EventService.getInstance();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new EventController();
    }
    return this.instance;
  }

  createEvent = async (req: Request, res: Response, next: NextFunction) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   const validationError = new Error("Validation failed");
    //   (validationError as any).status = 400;
    //   (validationError as any).errors = errors.array();
    //   return next(validationError);
    // }

    const result = await this.eventService.createEvent(req, res, next);
    return res.status(201).json(result);
  };

  updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const result = await this.eventService.updateEvent(req, res, next);
    return res.status(200).json(result);
  };

  getEvents = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.eventService.getEvents(req, res, next);
    return res.status(200).json(result);
  };

  getEventsWithoutCalendar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = await this.eventService.getEventsWithoutCalendar(
      req,
      res,
      next
    );
    return res.status(200).json(result);
  };

  getEventsOnlyForUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = await this.eventService.getEventsOnlyForUser(req, res, next);
    return res.status(200).json(result);
  };

  getUpcomingEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, timetableId } = req.query;
    const result = await this.eventService.getUpcomingEvents(
      Number(userId),
      Number(timetableId),
      next
    );

    return res.status(200).json(result);
  };

  removeEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { eventId } = req.query;

    await this.eventService.removeEvent(Number(eventId), next);
    return res.status(200).send("Event removed");
  };
}

export default EventController;

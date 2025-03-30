import sequelize from "../config/db";
import { validationResult, check } from "express-validator";
import EventModel from "../models/EventModel";
import EventMembers from "../models/EventMembers";
import { Op, where } from "sequelize";
import { NextFunction } from "express";
import HttpException from "../exceptions/exception";

class EventService {
  private static instance: EventService | null = null;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new EventService();
    }
    return this.instance;
  }

  async createEvent(req: any, res: any, next: NextFunction) {
    try {
      const {
        timetableId,
        eventName,
        startTime,
        endTime,
        description,
        isEventGroup,
        assignedUsersId,
        userId,
      } = req.body;
      // if (!eventName || !startTime || !endTime) {
      //   const errors = {
      //     eventName: !eventName,
      //     startTime: !startTime,
      //     endTime: !endTime,
      //   };

      //   const error = new HttpException(
      //     422,
      //     "Missing required fields: eventName, startTime, endTime",
      //     errors
      //   );
      //   next(error);
      // }
      const event = await EventModel.create({
        timetable_id: timetableId,
        event_name: eventName,
        start_time: startTime,
        end_time: endTime,
        description,
        user_id: userId,
        is_event_group: isEventGroup,
        created_at: new Date(),
        updated_at: new Date(),
      });

      if (assignedUsersId && assignedUsersId.length) {
        const newMembers = assignedUsersId.map((userId: number) => ({
          event_id: event.event_id,
          user_id: userId,
          created_at: new Date(),
          updated_at: new Date(),
        }));
        await EventMembers.bulkCreate(newMembers, { returning: true });
      }
      return event;
    } catch (err: any) {
      next(err);
    }
  }

  updateEvent = async (req: any, res: any, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { errors: errors.array() };
    }

    const {
      timetableId,
      eventName,
      startTime,
      endTime,
      description,
      isEventGroup = false,
      assignedUsersId,
      eventId,
    } = req.body;

    const userId = req.user.userId;
    if (!timetableId || !eventId) {
      const errors = {
        timetableId: !timetableId,
        eventId: !eventId,
      };

      const error = new HttpException(
        422,
        "Missing required fields: timetableId, eventId",
        errors
      );
      next(error);
    }

    try {
      await EventModel.update(
        {
          timetable_id: timetableId,
          event_name: eventName,
          start_time: startTime,
          end_time: endTime,
          description,
          user_id: userId,
          is_event_group: isEventGroup,
        },
        {
          where: { event_id: eventId },
        }
      );

      if (assignedUsersId && assignedUsersId.length) {
        const current = await EventMembers.findAll({
          where: { event_id: eventId },
        });

        const currentUsers = current.map((user: any) => user.user_id);

        const userToRemove = currentUsers.filter(
          (userId: number) => !assignedUsersId.includes(userId)
        );

        if (userToRemove.length > 0) {
          await EventMembers.destroy({
            where: {
              event_id: eventId,
              user_id: {
                [Op.in]: userToRemove,
              },
            },
          });
        }

        const userToAdd = assignedUsersId.filter(
          (userId: any) => !currentUsers.includes(userId)
        );

        if (userToAdd.length > 0) {
          const newMembers = userToAdd.map((userId: number) => ({
            event_id: eventId,
            user_id: userId,
          }));

          await EventMembers.bulkCreate(newMembers, { returning: true });
        }
      } else {
        await EventMembers.destroy({
          where: { event_id: eventId },
        });
      }
      return { message: "Event updated" };
    } catch (error) {
      next(error);
    }
  };

  getEvents = async (req: any, res: any, next: NextFunction) => {
    const { timetableId } = req.query;
    if (!timetableId) {
      const error = new HttpException(
        422,
        "Missing required fields: timetableId"
      );
      next(error);
    }

    try {
      const eventsResult = await EventModel.findAll({
        where: { timetable_id: timetableId },
      });

      const currentYear = new Date().getFullYear();
      let starYearDate = new Date(currentYear, 0, 2);

      const daysInYear = this.isLeapYear(starYearDate) ? 366 : 365;
      const newPages = [];
      for (let i = 0; i < daysInYear; i++) {
        const next = new Date(starYearDate);

        const isoString = next.toISOString();

        const obj = {
          date: isoString,
          events: [],
        };
        newPages.push(obj);

        starYearDate.setDate(starYearDate.getDate() + 1);
      }

      for (const event of eventsResult) {
        const eventDate = new Date((event as EventModel).start_time)
          .toISOString()
          .split("T")[0];
        await Promise.all(
          newPages.map(async (page: any) => {
            const pageDate = page.date.split("T")[0];
            if (eventDate === pageDate) {
              page.events.push(event);

              const membersResult = await EventMembers.findAll({
                where: {
                  event_id: event.event_id,
                },
              });

              const userIds = membersResult.map((member) => member.user_id);
              page.userIds = page.userIds || [];
              page.userIds = [...new Set([...page.userIds, ...userIds])];
            }
          })
        );
      }
      return { calendar: newPages };
    } catch (error) {
      next(error);
    }
  };

  getEventsWithoutCalendar = async (req: any, res: any, next: NextFunction) => {
    const { timetableId } = req.query;
    if (!timetableId) {
      const error = new HttpException(
        422,
        "Timetable ID is required to fetch events."
      );
      next(error);
    }
    const newPages = [];
    try {
      const result = await EventModel.findAll({
        where: { timetable_id: timetableId },
        order: [["start_time", "DESC"]],
      });

      for (const event of result) {
        const membersResult = await EventMembers.findAll({
          where: {
            event_id: event.event_id,
          },
        });

        const userIds = (membersResult as { user_id: number }[]).map(
          (member) => member.user_id
        );
        const eventWithMembers = { ...event.get({ plain: true }), userIds };
        newPages.push(eventWithMembers);
      }
      return newPages;
    } catch (error) {
      next(error);
    }
  };

  getEventsOnlyForUser = async (req: any, res: any, next: NextFunction) => {
    const { timetableId, userId } = req.query;
    if (!timetableId) {
      const error = new HttpException(
        422,
        "Missing required fields: timetableId, userId"
      );
      next(error);
    }
    try {
      const eventsFromTimetable = await EventModel.findAll({
        where: { timetable_id: timetableId },
      });

      const eventIds = (eventsFromTimetable as EventModel[]).map(
        (event) => event.event_id
      );

      if (eventIds.length === 0) {
        return null;
      }
      const eventIdsForCollaborator = await EventMembers.findAll({
        where: {
          event_id: {
            [Op.in]: eventIds,
          },
          user_id: userId,
        },
      });

      const collaboratorEventIds = eventIdsForCollaborator.map(
        (event: any) => event.event_id
      );

      const eventDetails = await EventModel.findAll({
        where: {
          event_id: {
            [Op.in]: collaboratorEventIds,
          },
        },
      });

      return eventDetails;
    } catch (error) {
      next(error);
    }
  };

  getUpcomingEvents = async (
    userId: number,
    timetableId: number,
    next: NextFunction
  ) => {
    try {
      if (!userId || !timetableId) {
        const error = new HttpException(
          422,
          "User ID and timetable ID are required to fetch upcoming events."
        );
        next(error);
      }

      const result = await EventModel.findAll({
        include: [
          {
            association: "event_members",
            where: { user_id: userId },
            required: true,
          },
        ],
        where: {
          timetable_id: timetableId,
          start_time: {
            [Op.gt]: new Date(), // Pobiera tylko wydarzenia, których start_time jest w przyszłości
          },
        },
        limit: 5,
      });
      return result;
    } catch (error) {
      next(error);
    }
  };

  removeEvent = async (eventId: number, next: NextFunction) => {
    if (!eventId) {
      const error = new HttpException(
        422,
        "Event ID is required to remove the event."
      );
      next(error);
    }
    try {
      await EventMembers.destroy({
        where: { event_id: eventId },
      });
      await EventModel.destroy({
        where: { event_id: eventId },
      });
    } catch (error) {
      next(error);
    }
  };

  isLeapYear = (year: any) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  changeDate = (dayNumber: any) => {
    if (dayNumber === 0) return 6;

    return dayNumber - 1;
  };
}

export default EventService;

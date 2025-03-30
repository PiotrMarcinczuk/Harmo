import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "../config/db";
import { validationResult, check } from "express-validator";
import User from "../models/User";
import UserTimetable from "../models/UserTimetable";
import EventModel from "../models/EventModel";
import EventMembers from "../models/EventMembers";
import { Op } from "sequelize";
import { NextFunction } from "express";
import HttpException from "../exceptions/exception";

class UserService {
  private static instance: UserService | null = null;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  getUser = async (
    userId: number,
    next: NextFunction
  ): Promise<Omit<User, "password_hash"> | undefined> => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        const error = new HttpException(
          404,
          "User not found. Please, check the user id and try again."
        );
        next(error);
      }
      const { password_hash, ...userWithoutPassword } = user!.get({
        plain: true,
      });
      return userWithoutPassword;
    } catch (error) {
      next(error);
    }
  };

  getCollaborators = async (
    timetableId: number,
    userId: number,
    next: NextFunction
  ) => {
    const collaboratorsWithoutPassword = [];
    if (!timetableId) {
      const error = new HttpException(
        404,
        "Timetable id is required. Please, provide a valid timetable id."
      );
      next(error);
    }
    try {
      const collaboratorsInfo = await UserTimetable.findAll({
        where: { timetable_id: timetableId },
      });

      const collaboratorIds = collaboratorsInfo.map(
        (collaborator: any) => collaborator.user_id
      );
      const collaborators = await User.findAll({
        where: {
          user_id: { [Op.in]: collaboratorIds },
        },
      });

      for (const collaborator of collaborators) {
        const { password_hash, ...collaboratorWithoutPassword } =
          collaborator.dataValues;
        collaboratorsWithoutPassword.push(collaboratorWithoutPassword);
      }
      return collaboratorsWithoutPassword;
    } catch (error) {
      next(error);
    }
  };

  getCollaboratorsForEvent = async (eventId: number, next: NextFunction) => {
    const collaboratorsWithoutPassword = [];
    if (!eventId) {
      const error = new HttpException(
        404,
        "Event ID is required. Please, provide a valid event id."
      );
      next(error);
    }
    try {
      const collaboratorsInfo = await EventMembers.findAll({
        where: { event_id: eventId },
      });

      if (collaboratorsInfo.length > 0) {
        const collaboratorIds = collaboratorsInfo.map(
          (collaborator: any) => collaborator.user_id
        );
        const collaborators = await User.findAll({
          where: {
            user_id: { [Op.in]: collaboratorIds },
          },
        });

        for (const collaborator of collaborators) {
          const { password_hash, ...collaboratorWithoutPassword } =
            collaborator.dataValues;
          collaboratorsWithoutPassword.push(collaboratorWithoutPassword);
        }
      }

      return collaboratorsWithoutPassword;
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: any, res: any) => {
    res.clearCookie("accessToken", {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    res.clearCookie("refreshAccessToken", {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    res.clearCookie("currentUser", {
      path: "/",
    });
  };

  createUser = async (req: any, res: any, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { errors: errors.array() };
    }

    const {
      name,
      email,
      password,
      dateOfBirth,
      surname,
      nickname,
      phone,
      isAdmin = false,
      timetableId,
    } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        date_of_birth: dateOfBirth,
        nickname,
        password_hash: hashedPassword,
        surname,
        phone,
        created_at: new Date(),
        is_admin: isAdmin,
      });

      if (newUser) {
        await UserTimetable.create({
          user_id: newUser.user_id,
          timetable_id: timetableId,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      return newUser;
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (targetUserId: number, next: NextFunction) => {
    try {
      const user = await User.findByPk(targetUserId);

      if (!user) {
        const error = new HttpException(
          404,
          "User not found. Please, check the user id and try again."
        );
        next(error);
      }
      const { password_hash, ...userWithoutPassword } = user!.dataValues;
      return userWithoutPassword;
    } catch (error) {
      next(error);
    }
  };

  removeUser = async (
    removedUserId: number,
    timetableId: number,
    next: NextFunction
  ) => {
    try {
      const events = await EventModel.findAll({
        where: { timetable_id: timetableId },
        attributes: ["event_id"],
      });
      const eventIds = events.map((event) => event.event_id);
      await EventMembers.destroy({
        where: {
          user_id: removedUserId,
          event_id: { [Op.in]: eventIds },
        },
      });
      await UserTimetable.destroy({
        where: { user_id: removedUserId, timetable_id: timetableId },
      });
      // await UserTimetable.destroy({
      //   where: { user_id: removedUserId },
      // });
      // await EventMembers.destroy({
      //   where: { user_id: removedUserId },
      // });
      // await User.destroy({
      //   where: { user_id: removedUserId },
      // });

      return { message: "User removed from your timetable" };
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: any, res: any, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { errors: errors.array() };
    }

    const {
      name,
      email,
      password,
      dateOfBirth,
      surname,
      nickname,
      phone,
      assignedUserId,
    } = req.body;
    try {
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.update(
          {
            name,
            email,
            date_of_birth: dateOfBirth,
            nickname,
            password_hash: hashedPassword,
            surname,
            phone,
          },
          {
            where: { user_id: assignedUserId },
            returning: true,
          }
        );
      } else {
        await User.update(
          {
            name,
            email,
            date_of_birth: dateOfBirth,
            nickname,
            surname,
            phone,
          },
          {
            where: { user_id: assignedUserId },
            returning: true,
          }
        );
      }
      return { message: "User updated" };
    } catch (error) {
      next(error);
    }
  };

  addCollaborator = async (req: any, res: any, next: NextFunction) => {
    const { timetableId, userId, email } = req.body;

    if (!timetableId || !userId) {
      const error = new HttpException(
        404,
        "Timetable id, user id and email are required. Please, provide a valid timetable id and user id"
      );
      next(error);
    }
    if (!email) {
      const error = new HttpException(
        404,
        "Email is required. Please, provide a valid email",
        { email: true }
      );
      next(error);
    }
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        const error = new HttpException(
          404,
          "User not found. Please, check the email and try again",
          { email: true }
        );
        next(error);
      }
      const isUserAlreadyCollaborator = await UserTimetable.findOne({
        where: { user_id: user!.user_id, timetable_id: timetableId },
      });
      if (isUserAlreadyCollaborator) {
        const error = new HttpException(
          422,
          "User is already a collaborator for this timetable",
          { email: true }
        );
        next(error);
      }

      if (user && user.is_admin === true) {
        const error = new HttpException(
          403,
          "You cannot add an admin as a collaborator"
        );
        next(error);
      } else {
        await UserTimetable.create({
          user_id: user!.user_id,
          timetable_id: timetableId,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      return { message: "User added as a collaborator" };
    } catch (error) {
      next(error);
    }
  };
}

export default UserService;

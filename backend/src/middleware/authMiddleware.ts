import jwt from "jsonwebtoken";
import pool from "../config/db";
import time from "console";
import HttpException from "../exceptions/exception";
import UserTimetable from "../models/UserTimetable";
const authenticateToken = (req: any, res: any, next: any) => {
  const cookies = req.headers["cookie"];
  if (!cookies) {
    const error = new HttpException(
      401,
      "You do not have access to this resource."
    );
    next(error);
  }

  const getCookie = (name: any) => {
    const cookieArr = cookies.split("; ");
    for (let cookie of cookieArr) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    const error = new HttpException(
      401,
      "You do not have access to this resource."
    );
    next(error);
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    const error = new HttpException(
      401,
      "You do not have access to this resource."
    );
    next(error);
  } else {
    jwt.verify(accessToken, jwtSecret, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
};

const checkTokenOwnership = (req: any, res: any, next: any) => {
  const idFromToken = req.user.userId;
  let idFromRequest = req.query.userId || req.body.userId;
  if (parseInt(idFromToken) !== parseInt(idFromRequest)) {
    const error = new HttpException(
      401,
      "You do not have access to this resource."
    );
    next(error);
  }
  next();
};

const checkIsUserInTimetable = async (req: any, res: any, next: any) => {
  const userId = req.user.userId;
  const timetableId = req.query.timetableId || req.body.timetableId;

  try {
    const response = await UserTimetable.findAll({
      where: {
        timetable_id: timetableId,
        user_id: userId,
      },
    });
    if (!response || response.length === 0) {
      const error = new HttpException(
        401,
        "You do not have access to this resource."
      );
      next(error);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export { authenticateToken, checkTokenOwnership, checkIsUserInTimetable };

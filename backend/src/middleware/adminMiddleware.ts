import sequelize from "../config/db";
import Timetable from "../models/Timetable";
import HttpException from "../exceptions/exception";
import dotenv from "dotenv";
dotenv.config();

const checkTimetableOwnership = async (req: any, res: any, next: any) => {
  const idFromToken = req.user.userId;
  const timetableId = req.query.timetableId || req.body.timetableId;
  if (!timetableId && !idFromToken) {
    const error = new HttpException(
      401,
      "You do not have access to this resource."
    );
    next(error);
  }
  try {
    let result = null;
    if (timetableId) {
      result = await Timetable.findOne({
        attributes: ["user_id"],
        where: { timetable_id: timetableId },
      });
    } else {
      result = await Timetable.findOne({
        attributes: ["timetable_id"],
        where: { user_id: idFromToken },
      });
    }

    if (!result?.dataValues) {
      const error = new HttpException(
        401,
        "You do not have access to this resource."
      );
      next(error);
    }

    if (timetableId && result) {
      const idFromRequest = Number(result.user_id);
      if (parseInt(idFromToken) !== idFromRequest) {
        const error = new HttpException(
          401,
          "You do not have access to this resource."
        );
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
  res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN!);
  next();
};

export { checkTimetableOwnership };

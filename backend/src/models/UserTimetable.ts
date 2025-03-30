import { Model, ForeignKey, BelongsTo, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import Timetable from "./Timetable";

class UserTimetable extends Model {
  declare user_id: number;
  declare timetable_id: number;
  declare created_at: Date;
  declare updated_at: Date;
}

UserTimetable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users_account",
        key: "user_id",
      },
    },
    timetable_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "timetables",
        key: "timetable_id",
      },
    },
  },
  {
    sequelize,
    tableName: "user_timetables",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

UserTimetable.hasMany(Timetable, {
  foreignKey: "timetable_id",
  sourceKey: "timetable_id",
  as: "timetables",
});

export default UserTimetable;

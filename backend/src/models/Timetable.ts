import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Timetable extends Model {
  declare timetable_id: number;
  declare user_id: number;
  declare timetable_name: string;
  declare created_at: Date;
  declare updated_at: Date;
}

Timetable.init(
  {
    timetable_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users_account",
        key: "user_id",
      },
      allowNull: false,
    },
    timetable_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "timetables",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Timetable;

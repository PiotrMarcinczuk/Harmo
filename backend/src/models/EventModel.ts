import { Model, DataTypes, Association } from "sequelize";
import sequelize from "../config/db";
import EventMembers from "./EventMembers";
import User from "./User";

class EventModel extends Model {
  declare event_id: number;
  declare timetable_id: number;
  declare event_name: string;
  declare start_time: Date;
  declare end_time: Date;
  declare description: string;
  declare user_id: number;
  declare created_at: Date;
  declare updated_at: Date;
  declare event_members?: EventMembers[];
  declare users_account?: User;

  static associations: {
    event_members: Association<EventModel, EventMembers>;
    users_account: Association<EventModel, User>;
  };
}

EventModel.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    timetable_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "timetables",
        key: "timetable_id",
      },
    },
    event_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users_account",
        key: "user_id",
      },
    },
  },
  {
    sequelize,
    tableName: "events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

EventModel.hasMany(EventMembers, {
  foreignKey: "event_id",
  sourceKey: "event_id",
  as: "event_members",
});

EventModel.hasMany(EventMembers, {
  foreignKey: "user_id",
  sourceKey: "user_id",
  as: "users_account",
});

export default EventModel;

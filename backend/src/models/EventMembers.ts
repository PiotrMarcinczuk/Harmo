import { Model, ForeignKey, BelongsTo, DataTypes } from "sequelize";

import sequelize from "../config/db";
import EventModel from "./EventModel";
import User from "./User";

class EventMembers extends Model {
  declare event_id: ForeignKey<number>;
  declare user_id: ForeignKey<number>;
  declare created_at: Date;
  declare updated_at: Date;
}

EventMembers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events",
        key: "event_id",
      },
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
    tableName: "event_members",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default EventMembers;

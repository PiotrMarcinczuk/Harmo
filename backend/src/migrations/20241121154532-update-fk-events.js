"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("events", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_id", // Nazwa klucza obcego
      references: {
        table: "users_account",
        field: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("events", "user_id");
  },
};

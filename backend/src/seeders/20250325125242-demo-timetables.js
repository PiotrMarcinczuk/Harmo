"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert Timetables
    await queryInterface.bulkInsert("timetables", [
      {
        timetable_name: "Plan1",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        timetable_name: "Plan2",
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("timetables", null, {});
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert User Timetables
    await queryInterface.bulkInsert("user_timetables", [
      {
        user_id: 1,
        timetable_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        timetable_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        timetable_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        timetable_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        timetable_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        timetable_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_timetables", null, {});
  },
};

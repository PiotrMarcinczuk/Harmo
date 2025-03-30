"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("events", [
      {
        event_name: "Zbieranie trawy",
        start_time: `2025-04-10 12:00:00`,
        end_time: `2025-04-14 14:00:00`,
        description: `Zbieranie trawy i liści z posesji omówionej przy poprzednim zleceniu`,
        user_id: 1,
        timetable_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        event_name: "Zbieranie liści",
        start_time: `2025-04-10 14:00:00`,
        end_time: `2025-04-14 15:00:00`,
        description: `Zbieranie trawy i liści z posesji omówionej przy poprzednim zleceniu`,
        user_id: 1,
        timetable_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        event_name: "Budowa altany",
        start_time: `2025-04-20 08:00:00`,
        end_time: `2025-04-21 18:00:00`,
        description: `Na posesji przy ul.Jana Pawła II 1, 11-041 Olsztyn, należy ukończyć budowe altany ogrodowej`,
        user_id: 1,
        timetable_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        event_name: "Mycie kostki",
        start_time: `2025-04-09 10:00:00`,
        end_time: `2025-04-09 14:00:00`,
        description: `Mycie kostki brukowej posesja omówiona przy poprzednim zleceniu`,
        user_id: 1,
        timetable_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

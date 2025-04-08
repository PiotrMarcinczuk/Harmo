"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert Events
    const events = [];
    for (let i = 1; i <= 10; i++) {
      events.push({
        event_name: "Koszenie trawy",
        start_time: `2025-04-01 ${10 + (i % 4)}:00:00`,
        end_time: `2025-04-01 ${12 + (i % 4)}:00:00`,
        description: `Koszenie trawy przez 2 godziny, posesja nr${i}. 11-041 Olsztyn aleja Wojska Polskiego ${i}`,
        user_id: i <= 10 ? 1 : 2,
        timetable_id: i <= 10 ? 1 : 2,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("events", events);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("events", null, {});
  },
};

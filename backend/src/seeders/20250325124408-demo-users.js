"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Kasztan!122", 10);
    await queryInterface.bulkInsert("users_account", [
      {
        name: "John",
        surname: "Doe",
        is_admin: true,
        email: "wyniotonator@example.com",
        date_of_birth: "1990-05-15",
        password_hash: hashedPassword,
        nickname: "Admin42",
        phone: "+4489991",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jan",
        surname: "Admin",
        is_admin: true,
        email: "piotrmarcinczuk@example.com",
        date_of_birth: "1990-05-15",
        password_hash: hashedPassword,
        nickname: "Admin222",
        phone: "+1234567",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "John1",
        surname: "Doe1",
        is_admin: false,
        email: "johndoe@example.com",
        date_of_birth: "1990-05-15",
        password_hash: hashedPassword,
        nickname: "jdoe",
        phone: "+2534567",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Karol",
        surname: "Kowalski",
        is_admin: false,
        email: "karolk@example.com",
        date_of_birth: "1990-05-15",
        password_hash: hashedPassword,
        nickname: "karolewicz",
        phone: "+1234667",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Piotr",
        surname: "Sznycewicz",
        is_admin: false,
        email: "ppp@example.com",
        date_of_birth: "1990-05-15",
        password_hash: hashedPassword,
        nickname: "jdoe",
        phone: "+1234444",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: "John",
        surname: "Stolarowicz",
        is_admin: false,
        email: "johnse@example.com",
        date_of_birth: "1990-05-15",
        password_hash: hashedPassword,
        nickname: "jasio122",
        phone: "+1234569",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_account", null, {});
  },
};

require("dotenv").config();

module.exports = {
  development: {
    username: process.env.ADMIN,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  // production: {
  //   username: process.env.ADMIN,
  //   password: process.env.PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: "/cloudsql/your-project-id:region:instance-id", // Połączenie z Cloud SQL
  //   dialect: "postgres",
  // },
};

import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import { Options as SequelizeConfig } from "sequelize";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "../config/config.js")[
  env
] as SequelizeConfig & { use_env_variable?: string };
const db: {
  [key: string]: any;
  sequelize?: Sequelize;
  Sequelize?: typeof Sequelize;
} = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
} else {
  sequelize = new Sequelize(
    config.database as string,
    config.username as string,
    config.password as string,
    config
  );
}

// Import all models in the directory, excluding this file and test files
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();
export default new Sequelize(
  process.env.DATABASE!,
  process.env.USER_NAME!,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: 3306,
    dialect: "mysql",
    logging: false,
  }
);

import sequelize from "./config";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  chatId: { type: DataTypes.STRING, unique: true },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default User;

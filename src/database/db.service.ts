import { Model } from "sequelize";
import sequelize from "./config";
import User from "./models";

async function connectToDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("База данных подключенна");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function createUser(id: string): Promise<void> {
  const existingUser = await User.findOne({ where: { chatId: id } });

  if (existingUser) {
    return;
  }

  await User.create({ chatId: id });
}

async function isAdmin(id: string): Promise<boolean> {
  const user = await User.findOne({ where: { chatId: id } });
  return user ? user.dataValues.isAdmin : false;
}

async function makeAdmin(id: string): Promise<boolean> {
  try {
    const user = await User.findOne({ where: { chatId: id } });

    if (!user) {
      return false;
    }

    await user.update({ isAdmin: true });
  } catch (error) {
    console.error(error);
  }
  return true;
}

async function getUsers() {
  return User.findAll();
}

export { connectToDb, createUser, isAdmin, makeAdmin, getUsers };

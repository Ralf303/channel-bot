import { Composer } from "telegraf";
import { isAdmin, makeAdmin } from "../database/db.service";
import { CustomContext } from "../core/context.interface";

const adminHandler = new Composer<CustomContext>();

adminHandler.command("new", async (ctx) => {
  try {
    const { id } = ctx.from;
    const status: boolean = await isAdmin(String(id));

    if (!status) {
      return await ctx.reply("Ты не админ");
    }

    await ctx.scene.enter("spamScene");
  } catch (error) {
    console.log("err in new", error);
  }
});

adminHandler.command("add", async (ctx) => {
  try {
    const { id } = ctx.from;
    const status: boolean = await isAdmin(String(id));

    if (!status) {
      ctx.reply("Ты не админ");
      return;
    }

    const adminId: string = ctx?.payload;

    if (adminId) {
      const result = await makeAdmin(adminId);

      if (result) {
        return await ctx.reply("Админ успешно добавлен");
      }

      return await ctx.reply("Такого юзера не существует");
    }

    await ctx.reply("Ты не ввел айди");
  } catch (error) {
    console.log("err in add", error);
  }
});

export default adminHandler;

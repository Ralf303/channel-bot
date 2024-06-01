import { Composer } from "telegraf";
import { createUser } from "../database/db.service";
import { CustomContext } from "../core/context.interface";

const commandHandler = new Composer<CustomContext>();

commandHandler.start(async (ctx) => {
  try {
    const { id } = ctx.from;
    await createUser(String(id));
    return await ctx.react("❤‍🔥");
  } catch (error) {
    console.log("err in start", error);
  }
});

export default commandHandler;

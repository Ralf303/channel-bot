import { Composer } from "telegraf";
import { createUser } from "../database/db.service";
import { CustomContext } from "../core/context.interface";
import { config } from "dotenv";
config();
const inviteHandler = new Composer<CustomContext>();

inviteHandler.on("chat_join_request", async (ctx) => {
  try {
    const channelId = process.env.CHANNEL_ID!;

    if (String(ctx.chat.id) !== channelId) {
      return;
    }

    const { id } = ctx.from;
    await createUser(String(id));
    await ctx.telegram.sendPhoto(
      ctx.from.id,
      { source: "images/first.png" },
      {
        caption: `Дарова, ${ctx.from.first_name}! Тебе пишут из ${ctx.chat.title}!`,
      }
    );
  } catch (error) {
    console.log("err in request", error);
  }
});

export default inviteHandler;

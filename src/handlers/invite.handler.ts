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
      { source: "images/main.png" },
      {
        caption: `🎁 50 Монет За Регистрацию!\n\n- Кешбек каждую неделю.\n- Промокоды.\n- Моментальные выплаты, без верификации.\n- Очень много бонусов.\n- Бонус при регистрации\n\nСсылка: <a href="https://drg.so/f5579194e">ТУТ</a> 👈`,
        parse_mode: "HTML",
      }
    );
  } catch (error) {
    console.log("err in request", error);
  }
});

export default inviteHandler;

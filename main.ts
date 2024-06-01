import { Telegraf, session, Scenes } from "telegraf";
import { CustomContext } from "./src/core/context.interface";
import { config } from "dotenv";
// @ts-ignore
import rateLimit from "telegraf-ratelimit";
import { connectToDb } from "./src/database/db.service";
import handlers from "./src/handlers/index";
import spamScene from "./src/scenes/spam.scene";

const start = async () => {
  config();
  await connectToDb();
  const bot = new Telegraf<CustomContext>(process.env.BOT_TOKEN!);
  const stage = new Scenes.Stage<CustomContext>([spamScene]);
  bot.catch(async (err) => {
    console.log(`Ошибка из catch: ${err}`);
  });
  bot.use(session());
  bot.use(stage.middleware());
  // bot.use((ctx) => {
  //   // @ts-ignore
  //   const photo = ctx.message.photo;
  //   // @ts-ignore
  //   const caption = ctx.message.caption;
  //   ctx.replyWithPhoto(photo[0].file_id, { caption });
  // });
  bot.use(
    rateLimit({
      window: 1000,
      limit: 5,
    })
  );
  bot.use(handlers);
  bot.launch({ dropPendingUpdates: true });
  console.log("Бот успешно запустился");
};

start();

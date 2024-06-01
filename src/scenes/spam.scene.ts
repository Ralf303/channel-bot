import { Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { CustomContext } from "../core/context.interface";
import { getUsers } from "../database/db.service";
import { sleep } from "../utils/utils";

const spamScene = new Scenes.BaseScene<CustomContext>("spamScene");

spamScene.enter(async (ctx) => {
  await ctx.reply(
    "Отправь мне сообщение которое отправится на рссылку или нажми /stop для отмены"
  );
});

spamScene.command("stop", async (ctx) => {
  await ctx.reply("Действие отменено");
  await ctx.scene.leave();
});

spamScene.on(message("text"), async (ctx) => {
  try {
    const { text } = ctx;
    const parse = ctx.entities();
    await ctx.react("👍");
    const users = await getUsers();
    let whiteUsers: number = 0;
    let blackUsers: number = 0;
    for (const user of users) {
      try {
        // @ts-ignore
        await ctx.telegram.sendMessage(user.chatId, text, {
          entities: parse,
        });
        whiteUsers++;
        await sleep(500);
      } catch (error) {
        blackUsers++;
        continue;
      }
    }

    await ctx.reply(
      `Рассылка закончена\n\nУспешно: ${whiteUsers}\nЗабанили бота ${blackUsers}`
    );
    await ctx.scene.leave();
  } catch (error) {
    console.log(error);
  }
});

spamScene.on(message("photo"), async (ctx) => {
  try {
    const { photo, caption } = ctx.message;
    const parse = ctx.entities();
    await ctx.react("👍");
    const users = await getUsers();
    let whiteUsers: number = 0;
    let blackUsers: number = 0;
    for (const user of users) {
      try {
        // @ts-ignore
        await ctx.telegram.sendPhoto(user.chatId, photo[0].file_id, {
          caption,
          caption_entities: parse,
        });
        whiteUsers++;
        await sleep(500);
      } catch (error) {
        blackUsers++;
        continue;
      }
    }

    await ctx.reply(
      `Рассылка закончена\n\nУспешно: ${whiteUsers}\nЗабанили бота ${blackUsers}`
    );
    await ctx.scene.leave();
  } catch (error) {
    console.log(error);
  }
});

export default spamScene;

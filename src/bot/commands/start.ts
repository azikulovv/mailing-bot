import { Input, Markup } from "telegraf";
import path from "path";
import { BotContext } from "@/types";

export const startCommand = async (ctx: BotContext) => {
  const imagePath = path.resolve("src/assets/start.jpeg");

  // const caption = "👋 Добр"о пожаловать!\nМеньше слов — больше стиля.";
  const caption = ctx.i18n.t("start.title");
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback(ctx.i18n.t("start.inline-button.catalog"), "catalog:page=1"),
  ]);

  try {
    if (ctx.callbackQuery && "data" in ctx.callbackQuery) {
      await ctx.editMessageMedia(
        {
          type: "photo",
          media: Input.fromLocalFile(imagePath),
          caption,
        },
        { reply_markup: keyboard.reply_markup }
      );
    } else {
      await ctx.replyWithPhoto(Input.fromLocalFile(imagePath), {
        caption,
        reply_markup: keyboard.reply_markup,
      });
    }
  } catch (err) {
    console.error("Error when executing the /start command:", err);
    await ctx.reply(ctx.i18n.t("start.error"));
  }
};

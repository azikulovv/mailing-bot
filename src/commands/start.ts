import { Context, Input, Markup } from "telegraf";
import path from "path";

export const startCommand = async (ctx: Context) => {
  const imagePath = path.resolve("src/assets/start.jpeg");

  const caption = "👋 Добро пожаловать!\nМеньше слов — больше стиля.";
  const keyboard = Markup.inlineKeyboard([Markup.button.callback("🛍️ Каталог", "catalog:page=1")]);

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
    await ctx.reply("⚠️ An error has occurred. Try again later.");
  }
};

import { Context, Input, Markup } from "telegraf";

export const startCommand = async (ctx: Context) => {
  const keyboard = Markup.inlineKeyboard([Markup.button.callback("🛍️ Каталог", `catalog:page=1`)], {
    columns: 1,
  });

  try {
    const isCallback = (ctx.callbackQuery as any).data;

    return await ctx.editMessageMedia(
      {
        type: "photo",
        media: Input.fromLocalFile("src/assets/start.jpeg"),
        caption: "Добро пожаловать.\n" + "Меньше слов — больше стиля.",
      },
      { reply_markup: keyboard.reply_markup }
    );
  } catch {
    return await ctx.replyWithPhoto(Input.fromLocalFile("src/assets/start.jpeg"), {
      caption: "Добро пожаловать.\n" + "Меньше слов — больше стиля.",
      reply_markup: keyboard.reply_markup,
    });
  }
};

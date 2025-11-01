import { Context, Input, Markup } from "telegraf";

export const startCommand = async (ctx: Context) => {
  await ctx.replyWithPhoto(Input.fromLocalFile("src/assets/start.jpeg"), {
    caption: "Добро пожаловать.\nМеньше слов — больше стиля.",
    ...Markup.inlineKeyboard([Markup.button.callback("Каталог", "catalog-page_1")]),
  });
};

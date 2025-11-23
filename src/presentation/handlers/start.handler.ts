import { Markup } from "telegraf";
import type { BotContext } from "@/types";

const startHandler = async (ctx: BotContext) => {
  const caption = ctx.i18n.t("start.title");
  const keyboard = Markup.inlineKeyboard([
    [
      Markup.button.callback("💬 Рассылки", "newsletters"),
      Markup.button.callback("✒️ Создать рассылку", "create"),
    ],
    [Markup.button.callback("Остановить рассылки", "stop")],
  ]);
  const messageOptions = { reply_markup: keyboard.reply_markup };

  try {
    if (ctx.callbackQuery && "data" in ctx.callbackQuery) {
      return await ctx.editMessageText(caption, messageOptions);
    }
    await ctx.reply(caption, messageOptions);
  } catch (err) {
    console.error("Error when executing the /start command:", err);
    await ctx.reply(ctx.i18n.t("start.error"));
  }
};

export default startHandler;

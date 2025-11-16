import { Markup } from "telegraf";
import type { BotContext } from "@/types";

export const startHandler = async (ctx: BotContext) => {
  const caption = ctx.i18n.t("start.title");

  const keyboard = Markup.inlineKeyboard([
    [
      Markup.button.callback("💬 Рассылки", "mailing"),
      Markup.button.callback("✒️ Создать рассылку", "create"),
    ],
    [Markup.button.callback("Остановить рассылку", `stop`)],
  ]);

  try {
    if (ctx.callbackQuery && "data" in ctx.callbackQuery) {
      return await ctx.editMessageText(caption, { reply_markup: keyboard.reply_markup });
    }

    await ctx.reply(caption, {
      reply_markup: keyboard.reply_markup,
    });
  } catch (err) {
    console.error("Error when executing the /start command:", err);
    await ctx.reply(ctx.i18n.t("start.error"));
  }
};

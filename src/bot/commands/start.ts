import { Markup } from "telegraf";
import { BotContext } from "@/types";

export const startCommand = async (ctx: BotContext) => {
  const caption = ctx.i18n.t("start.title");
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback("💬 Рассылки", "mailing"),
    Markup.button.callback("✒️ Создать рассылку", "create"),
  ]);

  try {
    if (ctx.callbackQuery && "data" in ctx.callbackQuery) {
      await ctx.editMessageText(caption, { reply_markup: keyboard.reply_markup });
    } else {
      await ctx.reply(caption, {
        reply_markup: keyboard.reply_markup,
      });
    }
  } catch (err) {
    console.error("Error when executing the /start command:", err);
    await ctx.reply(ctx.i18n.t("start.error"));
  }
};

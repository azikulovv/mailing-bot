import { Markup } from "telegraf";
import { BotContext } from "@/types";
import { mockMails } from "@/database";

export const mailingCallback = async (ctx: BotContext) => {
  await ctx.answerCbQuery();

  const keyboard = Markup.inlineKeyboard(
    [
      ...mockMails.map((mail) => Markup.button.callback(`${mail.title}`, `mail:${mail.id}`)),
      Markup.button.callback("Назад", "start"),
    ],
    { columns: 1 }
  );

  try {
    await ctx.editMessageText("Ваши рассылки", {
      reply_markup: keyboard.reply_markup,
      parse_mode: "HTML",
    });
  } catch (err) {
    console.error("❌ Error when updating the product card:", err);
    await ctx.reply(ctx.i18n.t("product.error.displaying"));
  }
};

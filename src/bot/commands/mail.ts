import { Markup } from "telegraf";
import { BotContext } from "@/types";
import { mockMails } from "@/database";

export const mailCallback = async (ctx: BotContext) => {
  await ctx.answerCbQuery();

  const keyboard = Markup.inlineKeyboard(
    [Markup.button.callback("Отправить", "send:id=1"), Markup.button.callback("Назад", "mailing")],
    { columns: 1 }
  );

  try {
    await ctx.editMessageText("Ваша рассылка", {
      reply_markup: keyboard.reply_markup,
      parse_mode: "HTML",
    });
  } catch (err) {
    console.error("❌ Error updating the mail:", err);
    await ctx.reply(ctx.i18n.t("mail.error.displaying"));
  }
};

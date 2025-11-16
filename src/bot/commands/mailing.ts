import { Markup } from "telegraf";
import { BotContext } from "@/types";
import { getMails } from "@/database/chats";

export const mailingCallback = async (ctx: BotContext) => {
  const mails = JSON.parse(JSON.stringify(getMails.all()));
  await ctx.answerCbQuery();

  const keyboard = Markup.inlineKeyboard(
    [
      ...mails.map((mail) => Markup.button.callback(`${mail.title}`, `mail:id=${mail.id}`)),
      Markup.button.callback("Назад", "start"),
    ],
    { columns: 1 }
  );

  try {
    await ctx.editMessageText("🗂 Текущий список ваших рассылок:", {
      reply_markup: keyboard.reply_markup,
      parse_mode: "HTML",
    });
  } catch (err) {
    console.error("❌ Error when updating the mailing:", err);
    await ctx.reply(ctx.i18n.t("mailing.error.displaying"));
  }
};

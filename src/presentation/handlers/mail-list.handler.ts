import { Markup } from "telegraf";
import { container } from "@/app/container";
import type { BotContext } from "@/types";

export const mailListHandler = async (ctx: BotContext) => {
  const mails = await container.mail.findAll.execute();

  await ctx.answerCbQuery();

  const keyboard = Markup.inlineKeyboard(
    [
      ...mails!.map((mail) => Markup.button.callback(`${mail.title}`, `mail:id=${mail.id}`)),
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

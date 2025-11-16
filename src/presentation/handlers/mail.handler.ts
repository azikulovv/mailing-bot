import { Markup } from "telegraf";

import { container } from "@/app/container";
import { parseCallbackData } from "@/utils/parseCallbackData";
import type { BotContext } from "@/types";

export const mailHandler = async (ctx: BotContext) => {
  const { id } = parseCallbackData<{ id: string }>((ctx.callbackQuery as any).data, /^mail:/);
  const mail = await container.mail.findById.execute(Number(id));
  await ctx.answerCbQuery();

  const keyboard = Markup.inlineKeyboard(
    [
      Markup.button.callback("Отправить", `send:id=${id}`),
      Markup.button.callback("Назад", "mailing"),
    ],
    { columns: 1 }
  );

  if (!mail) return ctx.reply(ctx.i18n.t("mail.error.displaying"));

  try {
    await ctx.editMessageText(`Ваша рассылка \nTitle: ${mail.title}\nMail: ${mail.content}`, {
      reply_markup: keyboard.reply_markup,
      parse_mode: "HTML",
    });
  } catch (err) {
    console.error("❌ Error updating the mail:", err);
    await ctx.reply(ctx.i18n.t("mail.error.displaying"));
  }
};

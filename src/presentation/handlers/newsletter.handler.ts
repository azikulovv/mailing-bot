import { Markup } from "telegraf";
import { container } from "@/app/container";
import { parseCallbackData } from "@/utils/parseCallbackData";
import type { BotContext } from "@/types";

const newsletterHandler = async (ctx: BotContext) => {
  const { id } = parseCallbackData<{ id: string }>((ctx.callbackQuery as any).data, /^newsletter:/);
  const newsletter = await container.newsletter.findById.execute(Number(id));
  await ctx.answerCbQuery();

  const keyboard = Markup.inlineKeyboard(
    [
      Markup.button.callback("💬 Переслать", `forward:id=${id}`),
      Markup.button.callback("❌ Удалить", `delete:id=${id}`),
      Markup.button.callback("⬅️ Назад", "newsletters"),
    ],
    { columns: 1 }
  );

  if (!newsletter) {
    return ctx.reply(ctx.i18n.t("mail.error.displaying"));
  }

  try {
    await ctx.editMessageText(
      `Ваша рассылка \nTitle: ${newsletter.title}\nnewsletter: ${JSON.stringify(
        newsletter.forwardMessageId
      )}`,
      {
        reply_markup: keyboard.reply_markup,
        parse_mode: "HTML",
      }
    );
  } catch (err) {
    console.error("❌ Error updating the newsletter:", err);
    await ctx.reply(ctx.i18n.t("mail.error.displaying"));
  }
};

export default newsletterHandler;

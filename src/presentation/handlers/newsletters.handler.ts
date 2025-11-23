import { Markup } from "telegraf";
import { container } from "@/app/container";
import type { BotContext } from "@/types";

const newslettersHandler = async (ctx: BotContext) => {
  const newsletters = await container.newsletter.findAll.execute();

  await ctx.answerCbQuery();

  const keyboard = Markup.inlineKeyboard(
    [
      ...newsletters!.map((newsletter: any) =>
        Markup.button.callback(`${newsletter.title}`, `newsletter:id=${newsletter.id}`)
      ),
      Markup.button.callback("⬅️ Назад", "start"),
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

export default newslettersHandler;

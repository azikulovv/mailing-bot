import { BotContext } from "@/types";

export const stopHandler = async (ctx: BotContext) => {
  await ctx.answerCbQuery();

  try {
    ctx.scheduler.stop();
    await ctx.editMessageText(`Ваша рассылка остановлена!`);
  } catch (err) {
    console.error("❌ Error updating the mail:", err);
    await ctx.reply(ctx.i18n.t("mail.error.displaying"));
  }
};

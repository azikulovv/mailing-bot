import { container } from "@/app/container";
import { parseCallbackData } from "@/utils/parseCallbackData";
import type { BotContext } from "@/types";

const deleteNewsletterHandler = async (ctx: BotContext) => {
  ctx.scheduler.stop();

  const { id } = parseCallbackData<{ id: string }>((ctx.callbackQuery as any).data, /^delete:/);
  await ctx.answerCbQuery();

  try {
    try {
      await container.newsletter.deleteById.execute(Number(id));
      await ctx.editMessageText(`Ваша рассылка удалена под id: ${id}!`);
    } catch {
      await ctx.editMessageText(`Ваша рассылка не удалена под id: ${id}!`);
    }
  } catch (err) {
    console.error("❌ Error updating the mail:", err);
    await ctx.reply(ctx.i18n.t("mail.error.displaying"));
  }
};

export default deleteNewsletterHandler;

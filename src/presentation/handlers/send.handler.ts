import { container } from "@/app/container";
import { BotContext } from "@/types";
import { parseCallbackData } from "@/utils/parseCallbackData";

export const sendHandler = async (ctx: BotContext) => {
  ctx.scheduler.stop();

  const { id } = parseCallbackData<{ id: string }>((ctx.callbackQuery as any).data, /^send:/);
  const mail = await container.mail.findById.execute(Number(id));
  await ctx.answerCbQuery();

  try {
    ctx.scheduler.start(mail!.chatsId, mail!.title, 10000);
    await ctx.editMessageText(`Ваша рассылка начата!`);
  } catch (err) {
    console.error("❌ Error updating the mail:", err);
    await ctx.reply(ctx.i18n.t("mail.error.displaying"));
  }
};

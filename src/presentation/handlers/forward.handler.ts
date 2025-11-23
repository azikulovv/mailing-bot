import { container } from "@/app/container";
import { parseCallbackData } from "@/utils/parseCallbackData";
import type { BotContext } from "@/types";

const forwardHandler = async (ctx: BotContext) => {
  ctx.scheduler.stop();

  const { id } = parseCallbackData<{ id: string }>((ctx.callbackQuery as any).data, /^forward:/);
  const mail = await container.newsletter.findById.execute(Number(id));
  await ctx.answerCbQuery();

  try {
    // Every 2 hours send message!
    console.log(mail);
    // ctx.scheduler.start(mail!.chatIds, mail!.forwardMessageId, 2 * 60 * 60 * 1000);

    // 10 sec
    ctx.scheduler.start(mail!.chatIds, Number(ctx.from?.id), mail!.forwardMessageId, 10 * 1000);
    await ctx.editMessageText(`Ваша рассылка начата!`);
  } catch (err) {
    console.error("❌ Error updating the mail:", err);
    await ctx.reply(ctx.i18n.t("mail.error.displaying"));
  }
};

export default forwardHandler;

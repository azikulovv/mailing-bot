import { BotContext } from "@/types";
import { getMailById } from "@/database/chats";

export const sendCallback = async (ctx: BotContext) => {
  const { id } = parseCallbackData<{ id: string }>((ctx.callbackQuery as any).data, /^send:/);
  const mail = getMailById.get(id);
  const parsedMail: object = JSON.parse(JSON.stringify(mail));
  await ctx.answerCbQuery();

  try {
    parsedMail.chats_id
      .replace(" ", "")
      .split(",")
      .forEach(async (id) => {
        await ctx.telegram.sendMessage(id, parsedMail.content);
      });

    await ctx.editMessageText(`Ваша рассылка отправлена!`);
  } catch (err) {
    console.error("❌ Error updating the mail:", err);
    await ctx.reply(ctx.i18n.t("mail.error.displaying"));
  }
};

export function parseCallbackData<T>(data: any, name: RegExp): T {
  try {
    const query = data.replace(name, "");
    const params = Object.fromEntries(new URLSearchParams(query));

    return params as T;
  } catch (err) {
    console.error("❌ Error parsing callback data:", err);
    throw new Error("Couldn't process product data");
  }
}

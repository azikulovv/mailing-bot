import { Markup } from "telegraf";
import { BotContext } from "@/types";
import { getMailById } from "@/database/chats";

export const mailCallback = async (ctx: BotContext) => {
  const { id } = parseCallbackData<{ id: string }>((ctx.callbackQuery as any).data, /^mail:/);
  const mail = getMailById.get(id);
  console.log(JSON.parse(JSON.stringify(mail)).chats_id.replace(" ", "").split(","));

  await ctx.answerCbQuery();

  const keyboard = Markup.inlineKeyboard(
    [
      Markup.button.callback("Отправить", `send:id=${id}`),
      Markup.button.callback("Назад", "mailing"),
    ],
    { columns: 1 }
  );

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

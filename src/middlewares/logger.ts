import { Context, MiddlewareFn } from "telegraf";

/**
 * Универсальный логгер для Telegram-бота.
 * Логирует тип апдейта, юзера и содержимое сообщения.
 */
export const logger: MiddlewareFn<Context> = async (ctx, next) => {
  const user = ctx.from
    ? `${ctx.from.username ?? ctx.from.first_name} (${ctx.from.id})`
    : "unknown user";

  const updateType = ctx.updateType;
  const chatId = ctx.chat?.id;
  const timestamp = new Date().toLocaleString("ru-RU");

  let payload: string | undefined;

  if ("text" in (ctx.message ?? {})) {
    payload = (ctx.message as any).text;
  } else if ("data" in (ctx.callbackQuery ?? {})) {
    payload = (ctx.callbackQuery as any).data;
  }

  console.log(
    `\n🧾 [${timestamp}] [${updateType}]`,
    `\n👤 User: ${user}`,
    `\n💬 Chat ID: ${chatId}`,
    payload ? `\n📦 Data: ${payload}` : "",
    `\n${"-".repeat(40)}`
  );

  try {
    await next(); // продолжаем цепочку middleware
  } catch (error) {
    console.error("❌ Error in logger middleware:", error);
  }
};

import { orderHandler } from "./order";
import type { TextContext } from "../types";

export const handlers = {
  order: orderHandler,
};

// Универсальный маршрутизатор
export const textHandler = async (context: TextContext) => {
  const { session } = context;

  if (!session || !session.flow) {
    console.log("Сообщение вне сценария:", context.message.text);
    return;
  }

  const handler = handlers[session.flow as keyof typeof handlers];
  if (handler) {
    await handler(context);
  } else {
    await context.reply("⚠️ Неизвестный сценарий. Используйте /start для начала.");
  }
};

import { Telegraf } from "telegraf";
import type { BotContext } from "@/types";

export class MessageScheduler {
  private intervalId: NodeJS.Timeout | null = null;

  constructor(private bot: Telegraf<BotContext>) {}

  start(chatsId: string, message: string, intervalMs: number) {
    if (this.intervalId) {
      console.log("Таймер уже запущен");
      return;
    }

    this.intervalId = setInterval(async () => {
      try {
        chatsId
          .replace(" ", "")
          .split(",")
          .forEach(async (chatId) => {
            await this.bot.telegram.sendMessage(chatId, message);
          });
      } catch (err) {
        console.error("Ошибка при отправке сообщения:", err);
      }
    }, intervalMs);

    console.log(`Таймер запущен, сообщение каждые ${intervalMs / 1000} секунд`);
  }

  stop() {
    if (!this.intervalId) return;

    clearInterval(this.intervalId);
    this.intervalId = null;
    console.log("Таймер остановлен");
  }
}

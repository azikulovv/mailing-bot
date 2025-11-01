import { bot } from "./bot";

bot.launch();

console.log("✅ Бот запущен");

// Корректная остановка (Ctrl+C)
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

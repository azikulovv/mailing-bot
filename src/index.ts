import { bot } from "./bot";

bot.launch();

console.log("✅ The bot is running");

// Корректная остановка (Ctrl+C)
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

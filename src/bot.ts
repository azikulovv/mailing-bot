import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "./config";
import { logger } from "./middlewares/logger";
import { startCommand } from "./commands/start";
import { catalogCommand } from "./commands/catalog";
import { productCallback } from "./callbacks/product";

export const bot = new Telegraf(BOT_TOKEN);

// Middlewares
bot.use(logger);

bot.start(startCommand);
bot.action("start", startCommand);

bot.action(/catalog:(.+)/, catalogCommand);

bot.action(/product:(.+)/, productCallback);

// Универсальный обработчик сообщений
bot.on("text", (ctx) => {
  console.log(`📩 Message from ${ctx.from.username}: ${ctx.message.text}`);
});

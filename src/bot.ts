import { Telegraf, session } from "telegraf";
import { constants } from "./config";
import { logger } from "./middlewares/logger";
import { startCommand } from "./commands/start";
import { catalogCommand } from "./commands/catalog";
import { productCallback } from "./callbacks/product";
import type { BotContext } from "./types";

export const bot = new Telegraf<BotContext>(constants.BOT_TOKEN);

// Middlewares
bot.use(logger);
bot.use(session({ defaultSession: () => ({}) }));

bot.start(startCommand);
bot.action("start", startCommand);
bot.action(/catalog:(.+)/, catalogCommand);
bot.action(/product:(.+)/, productCallback);

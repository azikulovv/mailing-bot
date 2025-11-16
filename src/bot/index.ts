import path from "path";
import { I18n } from "@edjopato/telegraf-i18n";
import { Scenes } from "telegraf";
import { Telegraf, session } from "telegraf";

import { logger } from "@/middlewares/logger";
import { commands } from "./commands";
import { constants } from "@/config";
import { createWizard } from "./scenes/create.scene";
import type { BotContext } from "@/types";

export const createBot = () => {
  const bot = new Telegraf<BotContext>(constants.BOT_TOKEN);
  const stage = new Scenes.Stage([createWizard]);

  const i18n = new I18n({
    defaultLanguage: "ru",
    directory: path.join(__dirname, "../locales"),
  });

  bot.use(logger);
  bot.use(session());
  bot.use(i18n.middleware());
  bot.use(stage.middleware());

  bot.start((ctx) => commands.start(ctx));
  bot.action("start", (ctx) => commands.start(ctx));
  bot.action(/mail:(.+)/, (ctx) => commands.mail(ctx));
  bot.action("mailing", (ctx) => commands.mailing(ctx));
  bot.action("create", (ctx) => ctx.scene.enter("createWizard"));

  return bot;
};

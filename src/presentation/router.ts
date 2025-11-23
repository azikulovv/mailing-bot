import path from "path";
import { I18n } from "@edjopato/telegraf-i18n";
import { Scenes, Telegraf, session } from "telegraf";

import { logger } from "@/middlewares/logger";
import { scenes } from "@/presentation/scenes";
import { handlers } from "@/presentation/handlers";
import { constants } from "@/config";
import type { BotContext } from "@/types";
import { MessageScheduler } from "@/infrastructure/telegram/schedular";
import { adminOnly } from "@/middlewares/adminOnly";

export const createBot = () => {
  let bot = new Telegraf<BotContext>(constants.BOT_TOKEN);
  const stage = new Scenes.Stage(scenes);

  bot.context.scheduler = new MessageScheduler(bot);

  const i18n = new I18n({
    defaultLanguage: "ru",
    directory: path.join(__dirname, "../locales"),
  });

  bot.use(logger);
  bot.use(session());
  bot.use(i18n.middleware());
  bot.use(stage.middleware());
  bot.use(adminOnly(constants.ADMIN_ID.split(",")));

  bot.start((ctx) => handlers.start(ctx));
  bot.action("start", (ctx) => handlers.start(ctx));
  bot.action("newsletters", (ctx) => handlers.newsletters(ctx));
  bot.action(/newsletter:(.+)/, (ctx) => handlers.newsletter(ctx));
  bot.action(/forward:(.+)/, (ctx) => handlers.forward(ctx));
  bot.action(/delete:(.+)/, (ctx) => handlers.delete(ctx));
  bot.action("stop", (ctx) => handlers.stop(ctx));
  bot.action("create", (ctx) => ctx.scene.enter("createScene"));

  return bot;
};

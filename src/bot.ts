import { Telegraf, Context, session } from "telegraf";
import { ADMIN_ID, BOT_TOKEN } from "./config";
import { logger } from "./middlewares/logger";
import { startCommand } from "./commands/start";
import { catalogCommand } from "./commands/catalog";
import { productCallback } from "./callbacks/product";
import { infoCallback } from "./callbacks/info";
import type { Product } from "./data/products";

interface MySession {
  step?: number;
  order?: {
    address?: string;
    contact?: string;
    product?: Product;
  };
}

export interface MyContext extends Context {
  session: MySession;
}

export const bot = new Telegraf<MyContext>(BOT_TOKEN);

// Middlewares
bot.use(logger);
bot.use(session({ defaultSession: () => ({}) }));

bot.start(startCommand);
bot.action("start", startCommand);

bot.action(/catalog:(.+)/, catalogCommand);

bot.action(/product:(.+)/, productCallback);

bot.action(/info:(.+)/, infoCallback);

// Универсальный обработчик сообщений
bot.on("text", async (ctx) => {
  const step = ctx.session.step;

  if (!step) return; // если пользователь не в процессе оформления

  if (step === 1) {
    ctx.session.order!.address = ctx.message.text;
    ctx.session.step = 2;
    await ctx.reply("📞 Теперь введите ваш контактный номер:");
    return;
  }

  if (step === 2) {
    ctx.session.order!.contact = ctx.message.text;
    ctx.session.step = 3;

    const { address, contact, product } = ctx.session.order!;
    await ctx.reply(
      `✅ Спасибо!\n\nВот ваши данные:\n🏠 Адрес: ${address}\n📞 Контакт: ${contact}\n Product: ${JSON.stringify(
        product
      )}`
    );

    await ctx.telegram.sendMessage(
      ADMIN_ID,
      `✅ Спасибо!\n\nВот ваши данные:\n🏠 Адрес: ${address}\n📞 Контакт: ${contact}\n Product: ${JSON.stringify(
        product
      )}`
    );

    // Очистим состояние
    ctx.session.step = undefined;
    ctx.session.order = undefined;
  }

  console.log(`📩 Message from ${ctx.from.username}: ${ctx.message.text}`);
});

import { Context, Markup, Scenes } from "telegraf";
import { BotContext } from "@/types";
import { constants } from "@/config";
import { Product } from "@/types/product";
import { products } from "@/database";
import { parseCallbackData } from "@/utils/parseCallbackData";

type State = {
  address: string;
  phone: string;
  product: Product;
};

let state: Partial<State> = {};

export const orderWizard = new Scenes.WizardScene<BotContext>(
  "orderWizard",

  // Step 1 - ask the user for the delivery address.
  async (ctx: BotContext) => {
    const { id } = parseCallbackData<{ id: string }>((ctx.callbackQuery as any).data, /^order:/);
    const product = products.find((p) => p.id === Number(id));

    state.product = product;

    await ctx.reply("📍 Куда необходимо доставить?");
    return ctx.wizard.next();
  },

  // Step 2 - ask the user for the phone number
  async (ctx) => {
    // (ctx.session as any).address = (ctx.message as any).text;
    state.address = (ctx.message as any).text;
    await ctx.reply("Введите номер телефона:");
    return ctx.wizard.next();
  },

  async (ctx) => {
    // (ctx.session as any).phone = (ctx.message as any).text;
    state.phone = (ctx.message as any).text;

    await ctx.reply(
      `✅ Проверьте данные:\n\n📍 Адрес: ${state.address}\n👤 Имя: ${ctx.from?.first_name}\n📞 Телефон: ${state.phone}\n Product Name: ${state.product?.name}`,
      Markup.inlineKeyboard([
        [Markup.button.callback("✅ Подтвердить", "confirm_order")],
        [Markup.button.callback("✏️ Изменить", "edit_order")],
        [Markup.button.callback("❌ Отменить", "cancel_order")],
      ])
    );
    return ctx.wizard.next();
  },

  async (ctx) => {
    if (!("callback_query" in ctx.update)) return;

    const action = (ctx.update.callback_query as any).data;

    if (action === "confirm_order") {
      await ctx.deleteMessage();

      await ctx.telegram.sendMessage(
        constants.ADMIN_ID,
        `📍 Адрес: ${state.address}\n👤 Имя: ${ctx.from?.first_name}\n📞 Телефон: ${state.phone}\n Product${state.product?.name}`
      );

      await ctx.reply("🎉 Заказ оформлен! Мы свяжемся с вами в ближайшее время.", {
        reply_markup: Markup.inlineKeyboard([Markup.button.callback("Главное меню", "start")])
          .reply_markup,
      });
      return ctx.scene.leave();
    }

    if (action === "edit_order") {
      await ctx.reply("✏️ Начнём заново. Введите адрес доставки:");
      ctx.wizard.selectStep(1);
      return;
    }

    if (action === "cancel_order") {
      await ctx.reply("❌ Заказ отменён. Если захотите начать снова — напишите /start.");
      return ctx.scene.leave();
    }
  }
);

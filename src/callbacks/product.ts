import { Context, Input, Markup } from "telegraf";
import { products } from "../data/products";

export const productCallback = async (ctx: Context) => {
  await ctx.answerCbQuery();
  const category = ctx.callbackQuery.data.replace("callback-catalog_", "");

  const product = products.find((p) => p.callback === category);

  await ctx.editMessageMedia(
    {
      type: "photo",
      media: Input.fromLocalFile("src/assets/products/wear.jpeg"),
      caption: `🔥 ${product?.name}\n${product?.description}\n\n💰 ${product?.price}\n⚡ Стиль, который выделяет. Возьми свой прямо сейчас!`,
    },
    {
      ...Markup.inlineKeyboard([
        [Markup.button.callback("Купить", "callback_wear_buy")],
        [Markup.button.callback("Назад", "catalog-page_1")],
      ]),
    }
  );
};

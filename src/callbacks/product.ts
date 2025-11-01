import { Context, Input, Markup } from "telegraf";
import { products } from "../data/products";

/** Безопасно извлекает номер страницы из callback data */
function getDataFromCallback(ctx: Context): { page: number; name: string } {
  try {
    const data = (ctx.callbackQuery as any)?.data ?? "";
    const query = data.replace(/^product:/, "");
    const params = Object.fromEntries(new URLSearchParams(query));
    return { page: Number(params.page) || 1, name: params.name };
  } catch {
    throw new Error("Не удалость найти объект!");
  }
}

export const productCallback = async (ctx: Context) => {
  await ctx.answerCbQuery();
  const data = getDataFromCallback(ctx);

  const product = products.find((p) => p.callback === data.name);

  await ctx.editMessageMedia(
    {
      type: "photo",
      media: Input.fromLocalFile(`src/assets/products/${product?.image}`),
      caption: `🔥 ${product?.name}\n${product?.description}\n\n💰 ${product?.price}\n⚡ Стиль, который выделяет. Возьми свой прямо сейчас!`,
    },
    {
      ...Markup.inlineKeyboard([
        [Markup.button.callback("💰 Купить", `info:name=${product?.callback}`)],
        [Markup.button.callback("⬅️ Назад", `catalog:page=${data.page}`)],
      ]),
    }
  );
};

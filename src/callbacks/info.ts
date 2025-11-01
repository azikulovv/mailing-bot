import { MyContext } from "../bot";
import { products } from "../data/products";

function getDataFromCallback(ctx: MyContext): string {
  try {
    const data = (ctx.callbackQuery as any)?.data ?? "";
    const query = data.replace(/^info:/, "");
    const name = Object.fromEntries(new URLSearchParams(query)).name;
    return name;
  } catch {
    throw new Error("Не удалость найти объект!");
  }
}

export const infoCallback = async (ctx: MyContext) => {
  await ctx.answerCbQuery();
  const product = products.find((p) => p.callback === getDataFromCallback(ctx));
  console.log(getDataFromCallback(ctx));
  ctx.session.step = 1;
  ctx.session.order = { product };
  await ctx.reply(`Ваш адрес: `);
};

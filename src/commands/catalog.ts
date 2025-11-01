// src/commands/catalog.ts
import { Context, Input } from "telegraf";
import { products } from "../data/products";
import { createPagination } from "../utils/pagination";
import { Product } from "../types/product";

export const catalogCommand = async (ctx: Context) => {
  const callbackData = (ctx.callbackQuery as any)?.data ?? "catalog:page=1";
  const match = callbackData.match(/page=(\d+)/);
  const currentPage = match ? Number(match[1]) : 1;

  console.log("📄 Текущая страница:", currentPage);

  const {
    keyboard,
    currentPage: page,
    totalPages,
  } = createPagination<Product>({
    items: products,
    page: currentPage,
    pageSize: 5,
    prefix: "catalog",
    mainMenu: { text: "🏠 Главное меню", callback: "start" },
    makeItemButton: (product) => ({
      text: product.name,
      callbackData: `product:id=${product.id}&page=${currentPage}`,
    }),
  });

  const caption = `🛍 Каталог\n\nСтраница ${page} из ${totalPages}`;

  if (ctx.callbackQuery) {
    await ctx.editMessageMedia(
      {
        type: "photo",
        media: Input.fromLocalFile("src/assets/catalog.jpeg"),
        caption,
      },
      { reply_markup: keyboard.reply_markup }
    );
  } else {
    await ctx.replyWithPhoto(Input.fromLocalFile("src/assets/catalog.jpeg"), {
      caption,
      reply_markup: keyboard.reply_markup,
    });
  }
};

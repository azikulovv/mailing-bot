import { Input } from "telegraf";
import { products } from "@/database";
import { createPagination } from "@/utils/pagination";
import type { BotContext, Product } from "@/types";

export const catalogCommand = async (ctx: BotContext) => {
  const callbackData = (ctx.callbackQuery as any)?.data ?? "catalog:page=1";
  const match = callbackData.match(/page=(\d+)/);
  const currentPage = match ? Number(match[1]) : 1;

  const {
    keyboard,
    currentPage: page,
    totalPages,
  } = createPagination<Product>({
    items: products,
    page: currentPage,
    pageSize: 5,
    prefix: "catalog",
    mainMenu: { text: ctx.i18n.t("catalog.inline-button.main-menu"), callback: "start" },
    makeItemButton: (product) => ({
      text: product.name,
      callbackData: `product:id=${product.id}&page=${currentPage}`,
    }),
  });

  const caption = ctx.i18n.t("catalog.title", { pages: page, totalPages });

  if (ctx.callbackQuery) {
    await ctx.editMessageMedia(
      {
        type: "photo",
        media: Input.fromLocalFile("src/assets/catalog.png"),
        caption,
      },
      { reply_markup: keyboard.reply_markup }
    );
  } else {
    await ctx.replyWithPhoto(Input.fromLocalFile("src/assets/catalog.png"), {
      caption,
      reply_markup: keyboard.reply_markup,
    });
  }
};

import { Context, Input, Markup } from "telegraf";
import { products } from "../data/products";

const PAGE_SIZE = 5;
const CATALOG_IMAGE = "src/assets/catalog.jpeg";

interface Product {
  id: number;
  name: string;
  callback: string;
  description: string;
  price: string;
}

interface CatalogCallback {
  page: number;
}

/** Безопасно извлекает номер страницы из callback data */
function getPageFromCallback(ctx: Context): number {
  try {
    const data = (ctx.callbackQuery as any)?.data ?? "";
    const query = data.replace(/^catalog:/, "");
    const params = Object.fromEntries(new URLSearchParams(query));
    const page = parseInt(params.page, 10);
    return isNaN(page) ? 1 : page;
  } catch {
    return 1;
  }
}

/** Формирует callback data для пагинации */
function buildCatalogCallback(page: number): string {
  return `catalog:page=${page}`;
}

/** Формирует inline-клавиатуру каталога */
function buildCatalogKeyboard(currentPage: number, total: number, pageProducts: Product[]) {
  const productButtons: any[] = pageProducts.map((p) => [
    Markup.button.callback(p.name, `product:name=${p.callback}&page=${currentPage}`),
  ]);

  const navButtons: ReturnType<typeof Markup.button.callback>[] = [];

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (currentPage > 1) {
    navButtons.push(Markup.button.callback("⬅️ Назад", buildCatalogCallback(currentPage - 1)));
  }
  if (currentPage < totalPages) {
    navButtons.push(Markup.button.callback("➡️ Далее", buildCatalogCallback(currentPage + 1)));
  }

  // Добавим кнопку "🏠 В главное меню" при желании
  navButtons.push(Markup.button.callback("🏠 Главное меню", "start"));

  return Markup.inlineKeyboard([...productButtons, navButtons], { columns: 1 });
}

export const catalogCommand = async (ctx: Context) => {
  try {
    await ctx.answerCbQuery();

    const currentPage = getPageFromCallback(ctx);
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const pageProducts = products.slice(start, end);

    const keyboard = buildCatalogKeyboard(currentPage, products.length, pageProducts);

    const totalPages = Math.ceil(products.length / PAGE_SIZE);

    await ctx.editMessageMedia(
      {
        type: "photo",
        media: Input.fromLocalFile(CATALOG_IMAGE),
        caption:
          `🛍️ *Каталог одежды*\n` +
          `Только актуальные коллекции и стиль без компромиссов.\n\n` +
          `📄 Страница ${currentPage} из ${totalPages}\n\n` +
          `Выберите категорию 👇`,
        parse_mode: "Markdown",
      },
      {
        reply_markup: keyboard.reply_markup,
      }
    );
  } catch (error) {
    console.error("Ошибка в catalogCommand:", error);
    await ctx.reply("❌ Произошла ошибка при открытии каталога. Попробуйте позже.");
  }
};

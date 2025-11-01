import { Context, Input, Markup } from "telegraf";
import { products } from "../data/products";

// Сколько товаров показывать на одной странице
const PAGE_SIZE = 5;

export const catalogCommand = async (ctx: Context) => {
  await ctx.answerCbQuery();

  // Извлекаем номер страницы из callback (по умолчанию 1)
  const data = (ctx.callbackQuery as any)?.data || "";
  const match = data.match(/page_(\d+)/);
  const currentPage = match ? parseInt(match[1]) : 1;

  // Рассчитываем диапазон элементов
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageProducts = products.slice(start, end);

  // Кнопки с товарами
  const productButtons = pageProducts.map((product) => [
    Markup.button.callback(product.name, `callback-catalog_${product.callback}`),
  ]);

  // Кнопки навигации
  const navButtons = [];

  if (currentPage > 1) {
    navButtons.push(Markup.button.callback("⬅️ Назад", `catalog-page_${currentPage - 1}`));
  }

  if (end < products.length) {
    navButtons.push(Markup.button.callback("➡️ Далее", `catalog-page_${currentPage + 1}`));
  }

  // Итоговая клавиатура
  const keyboard = Markup.inlineKeyboard([...productButtons, navButtons], { columns: 1 });

  // Обновляем сообщение с каталогом
  await ctx.editMessageMedia(
    {
      type: "photo",
      media: Input.fromLocalFile("src/assets/catalog.jpeg"),
      caption:
        "Добро пожаловать в наш каталог.\n" +
        "Только актуальные коллекции и стиль без компромиссов.\n\n" +
        `Страница ${currentPage} из ${Math.ceil(
          products.length / PAGE_SIZE
        )}.\n\nВыберите категорию 👇`,
    },
    {
      reply_markup: keyboard.reply_markup,
    }
  );
};

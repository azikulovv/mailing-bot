import { Markup } from "telegraf";

/**
 * Кнопка, которая отображается в списке пагинации.
 * Например, один элемент каталога.
 */
export interface PaginationButton {
  /** Текст кнопки */
  text: string;
  /** Callback-данные, которые бот получит при нажатии */
  callbackData: string;
}

/**
 * Параметры функции пагинации
 */
export interface PaginationOptions<T> {
  /** Все элементы, которые нужно разбить по страницам */
  items: T[];

  /** Текущая страница (начиная с 1) */
  page: number;

  /** Количество элементов на странице */
  pageSize: number;

  /** Функция, которая превращает элемент в кнопку */
  makeItemButton: (item: T) => PaginationButton;

  /** Префикс для callback (например, "catalog" или "orders") */
  prefix?: string;

  /**
   * Кнопка "Главное меню"
   * Можно просто включить (true) или задать свой текст и callback
   */
  mainMenu?: boolean | { text: string; callback: string };
}

/**
 * 💡 Универсальный генератор пагинации для Telegraf
 *
 * — Работает с любыми данными (товары, пользователи, заказы)
 * — Легко настраивается и расширяется
 * — Возвращает готовую inline-клавиатуру и мета-информацию
 */
export function createPagination<T>(options: PaginationOptions<T>) {
  const { items, page, pageSize, makeItemButton, prefix = "page", mainMenu } = options;

  /** Подсчёт страниц и безопасное ограничение */
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  /** Элементы, которые попадут на текущую страницу */
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageItems = items.slice(startIndex, endIndex);

  /** Кнопки для каждого элемента */
  const itemButtons = pageItems.map((item) => {
    const { text, callbackData } = makeItemButton(item);
    return [Markup.button.callback(text, callbackData)];
  });

  /** Кнопки навигации */
  const prevButton =
    currentPage > 1
      ? Markup.button.callback("⬅️ Назад", `${prefix}:page=${currentPage - 1}`)
      : null;

  const nextButton =
    currentPage < totalPages
      ? Markup.button.callback("➡️ Далее", `${prefix}:page=${currentPage + 1}`)
      : null;

  /** Кнопка "Главное меню" (опциональная) */
  const mainMenuButton = mainMenu
    ? typeof mainMenu === "object"
      ? Markup.button.callback(mainMenu.text, mainMenu.callback)
      : Markup.button.callback("🏠 Главное меню", "start")
    : null;

  /** Формируем нижний ряд: [⬅️ Назад] [🏠 Главное меню] [➡️ Далее] */
  const navRow = [prevButton, mainMenuButton, nextButton].filter(Boolean);

  /** Собираем итоговую клавиатуру */
  const keyboard = Markup.inlineKeyboard([...itemButtons, navRow], { columns: 1 });

  /** Возвращаем результат */
  return {
    keyboard,
    totalPages,
    currentPage,
  };
}

/**
 * Безопасно извлекает параметры из callback data
 * Пример: "product:id=3&page=1"
 */
export function parseCallbackData<T>(data: any, name: RegExp): T {
  try {
    const query = data.replace(name, "");
    const params = Object.fromEntries(new URLSearchParams(query));

    return params as T;
  } catch (err) {
    console.error("❌ Error parsing callback data:", err);
    throw new Error("Couldn't process product data");
  }
}

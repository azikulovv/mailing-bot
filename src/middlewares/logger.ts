import { Context } from "telegraf";

export const logger = async (ctx: Context, next: () => Promise<void>) => {
  const user = ctx.from?.username ?? "unknown";
  const text = (ctx.message as any)?.text ?? "";
  console.log(`🧾 [${user}]: ${text}`);
  await next();
};

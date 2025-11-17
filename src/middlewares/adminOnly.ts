import { Context, MiddlewareFn } from "telegraf";

export const adminOnly = (adminIds: string[]): MiddlewareFn<Context> => {
  return async (ctx, next) => {
    const userId = ctx.from?.id;

    if (!userId || !adminIds.includes(userId.toString())) {
      try {
        await ctx.reply("❌ Доступ запрещён. Только админы могут использовать этого бота.");
      } catch {}
      return;
    }

    return next();
  };
};

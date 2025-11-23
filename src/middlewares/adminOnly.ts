import { Context, MiddlewareFn } from "telegraf";

export const adminOnly = (adminIds: string[]): MiddlewareFn<Context> => {
  return async (ctx, next) => {
    const userId = ctx.from?.id;

    if (!userId || !adminIds.includes(userId.toString())) {
      try {
      } catch {}
      return;
    }

    return next();
  };
};

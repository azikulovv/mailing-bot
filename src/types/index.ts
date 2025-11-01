import type { Message, Update } from "telegraf/typings/core/types/typegram";
import type { Context, NarrowedContext, Scenes } from "telegraf";
import type { Product } from "./product";

export interface BotSession {
  flow: string;
  step: number;
  order: {
    address: string;
    contact: string;
    product: Product;
  };
}

export interface BotContext extends Context {
  session: Partial<BotSession>;
}

export type TextContext = NarrowedContext<BotContext, Update.MessageUpdate<Message.TextMessage>>;

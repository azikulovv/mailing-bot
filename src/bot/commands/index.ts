import { startCommand } from "./start";
import { catalogCommand } from "./catalog";
import { productCallback } from "./product";

export const commands = {
  start: startCommand,
  catalog: catalogCommand,
  product: productCallback,
};

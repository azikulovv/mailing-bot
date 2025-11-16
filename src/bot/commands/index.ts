import { startCommand } from "./start";
import { mailCallback } from "./mail";
import { mailingCallback } from "./mailing";

export const commands = {
  start: startCommand,
  mail: mailCallback,
  mailing: mailingCallback,
};

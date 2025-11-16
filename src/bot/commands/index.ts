import { startCommand } from "./start";
import { mailCallback } from "./mail";
import { mailingCallback } from "./mailing";
import { sendCallback } from "./send";

export const commands = {
  start: startCommand,
  send: sendCallback,
  mail: mailCallback,
  mailing: mailingCallback,
};

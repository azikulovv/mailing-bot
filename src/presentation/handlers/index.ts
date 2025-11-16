import { startHandler } from "./start.handler";
import { mailHandler } from "./mail.handler";
import { mailListHandler } from "./mail-list.handler";
import { sendHandler } from "./send.handler";
import { stopHandler } from "./stop.handler";

export const handlers = {
  start: startHandler,
  mail: mailHandler,
  mailList: mailListHandler,
  send: sendHandler,
  stop: stopHandler,
};

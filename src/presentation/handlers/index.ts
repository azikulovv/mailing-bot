import startHandler from "./start.handler";
import newslettersHandler from "./newsletters.handler";
import newsletterHandler from "./newsletter.handler";
import forwardHandler from "./forward.handler";
import deleteNewsletterHandler from "./delete.handler";
import stopHandler from "./stop.handler";

export const handlers = {
  start: startHandler,
  newsletters: newslettersHandler,
  newsletter: newsletterHandler,
  forward: forwardHandler,
  delete: deleteNewsletterHandler,
  stop: stopHandler,
};

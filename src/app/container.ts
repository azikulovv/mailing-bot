import { MailRepositorySQLite } from "@/infrastructure/repositories/newsletter.repository";

import { FindMailsUseCase } from "./use-cases/mail/find-mails.usecase";
import { CreateNewsletterUseCase } from "./use-cases/mail/create.usecase";
import { FindByIdUseCase } from "./use-cases/mail/find-by-id.usecase";
import { DeleteByIdUseCase } from "./use-cases/mail/delete-by-id.usecase";

const mailRepo = new MailRepositorySQLite();

export const container = {
  newsletter: {
    create: new CreateNewsletterUseCase(mailRepo),
    findAll: new FindMailsUseCase(mailRepo),
    findById: new FindByIdUseCase(mailRepo),
    deleteById: new DeleteByIdUseCase(mailRepo),
  },
};

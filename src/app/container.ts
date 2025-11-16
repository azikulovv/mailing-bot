import { MailRepositorySQLite } from "@/infrastructure/repositories/mail.repository";

import { FindMailsUseCase } from "./use-cases/mail/find-mails.usecase";
import { CreateMailUseCase } from "./use-cases/mail/create-mail.usecase";
import { FindMailByIdUseCase } from "./use-cases/mail/find-mail-by-id.usecase";

const mailRepo = new MailRepositorySQLite();

export const container = {
  mail: {
    create: new CreateMailUseCase(mailRepo),
    findAll: new FindMailsUseCase(mailRepo),
    findById: new FindMailByIdUseCase(mailRepo),
  },
};

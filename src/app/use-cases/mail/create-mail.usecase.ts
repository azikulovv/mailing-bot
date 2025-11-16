import { Mail } from "@/domain/entities/mail";
import { MailRepository } from "@/domain/repositories/mail.repository";

export class CreateMailUseCase {
  constructor(private readonly mail: MailRepository) {}

  async execute(mail: Mail) {
    await this.mail.create(mail);
  }
}

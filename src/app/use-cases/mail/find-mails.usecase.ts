import { Mail } from "@/domain/entities/mail";
import { MailRepository } from "@/domain/repositories/mail.repository";

export class FindMailsUseCase {
  constructor(private readonly mail: MailRepository) {}

  async execute() {
    return await this.mail.findAll();
  }
}

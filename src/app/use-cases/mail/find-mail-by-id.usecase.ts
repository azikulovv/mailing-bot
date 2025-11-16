import { MailRepository } from "@/domain/repositories/mail.repository";

export class FindMailByIdUseCase {
  constructor(private readonly mail: MailRepository) {}

  async execute(mailId: number) {
    return await this.mail.findById(mailId);
  }
}

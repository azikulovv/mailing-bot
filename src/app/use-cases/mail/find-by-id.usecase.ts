import { NewsletterRepository } from "@/domain/repositories/mail.repository";

export class FindByIdUseCase {
  constructor(private readonly newsletter: NewsletterRepository) {}

  async execute(newsletterId: number) {
    return await this.newsletter.findById(newsletterId);
  }
}

import { Newsletter } from "@/domain/entities/newsletter";
import { NewsletterRepository } from "@/domain/repositories/mail.repository";

export class CreateNewsletterUseCase {
  constructor(private readonly newsletter: NewsletterRepository) {}

  async execute(newsletter: Newsletter) {
    await this.newsletter.create(newsletter);
  }
}

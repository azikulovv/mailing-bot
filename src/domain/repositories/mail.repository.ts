import { Newsletter } from "@/domain/entities/newsletter";

export interface NewsletterRepository {
  findById(id: number): Promise<Newsletter | null>;
  findAll(): Promise<Newsletter[] | null>;
  create(newsletter: Newsletter): Promise<void>;
  deleteById(id: number): Promise<void>;
}

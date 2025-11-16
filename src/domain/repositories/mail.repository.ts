import { Mail } from "@/domain/entities/mail";

export interface MailRepository {
  findById(id: number): Promise<Mail | null>;
  findAll(): Promise<Mail[] | null>;
  create(mail: Mail): Promise<void>;
  deleteById(id: number): Promise<void>;
}

import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, "BOT_TOKEN is required"),
  ADMIN_ID: z.string().min(1, "ADMIN_ID is required"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const constants = parsed.data;

console.log(`✅ Environment loaded (${constants.NODE_ENV})`);

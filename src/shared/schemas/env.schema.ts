import { z } from "zod";

export const envSchema = z.object({
  APP_ENV: z.enum(["development", "production", "test"]).default("development"),
  TAURI_DEV_HOST: z.string().default("localhost"),
  VITE_API_URL: z.url().default("http://localhost:3001"),
});

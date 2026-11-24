import { envSchema } from "@/shared/schemas/env.schema";

const createEnv = () => {
  const result = envSchema.safeParse({
    APP_ENV: import.meta.env.APP_ENV,
    TAURI_DEV_HOST: import.meta.env.TAURI_DEV_HOST,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  });

  if (!result.success) {
    console.error("--- Invalid environment variables:", result.error.format());
    throw new Error("Invalid environment variables");
  }

  return result.data;
};

export const env = createEnv();

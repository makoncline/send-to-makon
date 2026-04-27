import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MY_EMAIL: z.string().email(),
    MY_EMAIL_PHONE_NUMBER: z.string().email(),
    SMTP_PASS: z.string().min(1),
    TELEGRAM_BOT_TOKEN: z.string().min(1),
    TELEGRAM_CHAT_ID: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    MY_EMAIL: process.env.MY_EMAIL,
    MY_EMAIL_PHONE_NUMBER: process.env.MY_EMAIL_PHONE_NUMBER,
    SMTP_PASS: process.env.SMTP_PASS,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  },
});

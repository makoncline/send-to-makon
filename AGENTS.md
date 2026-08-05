<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

- [2026-04-27] Next dev sandbox bind: Starting `npm run dev` inside the sandbox fails with `listen EPERM` even on `127.0.0.1`; escalated `npm run dev` starts successfully and may choose port 3001 if 3000 is busy. When testing local Next.js routes, request escalation for the dev server and use the printed localhost port.
- [2026-04-27] SMTP mail transport: Message endpoints use `src/server/smtp-mail.ts` with Nodemailer and hardcoded Gmail SMTP settings for `sendtomakon@gmail.com`; env only requires `SMTP_PASS`, `MY_EMAIL`, and `MY_EMAIL_PHONE_NUMBER`. When debugging delivery, check the Gmail app password and recipient vars rather than local Postfix/sendmail.
- [2026-04-27] T3 env validation: Environment validation uses the current Create T3 App-style `src/env.mjs` with `@t3-oss/env-nextjs` and `zod`. When adding env vars, update both `server` and `runtimeEnv`; `next.config.mjs` imports the env file so builds fail fast.
- [2026-04-27] Telegram route: `/api/send-telegram` uses the Telegram Bot API directly via `fetch`, with `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` validated in `src/env.mjs`. When testing a channel, the bot must be added to the channel and have permission to post.
- [2026-04-27] Image URL support: Message routes accept optional `imageUrl` query params. Telegram sends it through `sendPhoto`; email and text include the URL in the body.

# send-to-makon

Small Next.js app with three fixed-recipient message endpoints:

- `/api/send-email?subject=...&message=...&imageUrl=...`
- `/api/send-text?subject=...&message=...&imageUrl=...`
- `/api/send-telegram?subject=...&message=...&imageUrl=...`

Email and text deliver through Gmail SMTP using Nodemailer. Telegram delivers
through the Telegram Bot API.

Optional `imageUrl` must be HTTP(S). Telegram sends it as a photo; email and
text include the URL.

OpenAPI docs are available at `/api/openapi.json`.

## Environment

Required:

- `MY_EMAIL`: email recipient for `/api/send-email`
- `MY_EMAIL_PHONE_NUMBER`: email-to-SMS/MMS recipient for `/api/send-text`
- `SMTP_PASS`: Gmail app password for `sendtomakon@gmail.com`
- `TELEGRAM_BOT_TOKEN`: Telegram bot token
- `TELEGRAM_CHAT_ID`: Telegram chat, group, or channel id for
  `/api/send-telegram`

The Gmail SMTP host, port, TLS mode, username, and sender are hardcoded in
`src/server/smtp-mail.ts` to `sendtomakon@gmail.com`.

Environment variables are validated with the current Create T3 App-style
`@t3-oss/env-nextjs` setup in `src/env.mjs`.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run start
```

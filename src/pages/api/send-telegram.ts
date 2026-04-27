import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env.mjs";
import { isHttpUrl } from "../../server/query";
import {
  sendTelegramMessage,
  telegramErrorResponse,
} from "../../server/telegram";

const sendTelegram = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message, subject, imageUrl } = req.query;
  if (
    typeof message !== "string" ||
    (subject && typeof subject !== "string") ||
    (imageUrl && (typeof imageUrl !== "string" || !isHttpUrl(imageUrl)))
  ) {
    return res.status(400).end();
  }

  try {
    await sendTelegramMessage({
      botToken: env.TELEGRAM_BOT_TOKEN,
      chatId: env.TELEGRAM_CHAT_ID,
      text: subject ? `${subject}\n\n${message}` : message,
      imageUrl: typeof imageUrl === "string" ? imageUrl : undefined,
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json(telegramErrorResponse(error));
  }
};

export default sendTelegram;

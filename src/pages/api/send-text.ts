import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env.mjs";
import { isHttpUrl } from "../../server/query";
import { mailErrorResponse, sendMail } from "../../server/smtp-mail";

const sendText = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message, subject, imageUrl } = req.query;
  if (
    typeof message !== "string" ||
    (subject && typeof subject !== "string") ||
    (imageUrl && (typeof imageUrl !== "string" || !isHttpUrl(imageUrl)))
  ) {
    return res.status(400).end();
  }

  const resolvedImageUrl = typeof imageUrl === "string" ? imageUrl : undefined;
  const localMessage = {
    pass: env.SMTP_PASS,
    to: env.MY_EMAIL_PHONE_NUMBER,
    subject: subject || "No subject",
    text: resolvedImageUrl ? `${message}\n\n${resolvedImageUrl}` : message,
  };

  try {
    await sendMail(localMessage);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json(mailErrorResponse(error));
  }
};

export default sendText;

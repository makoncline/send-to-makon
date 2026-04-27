import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env.mjs";
import { isHttpUrl } from "../../server/query";
import { mailErrorResponse, sendMail } from "../../server/smtp-mail";

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { subject, message, html, imageUrl } = req.query;
  if (
    typeof message !== "string" ||
    typeof subject !== "string" ||
    (html && typeof html !== "string") ||
    (imageUrl && (typeof imageUrl !== "string" || !isHttpUrl(imageUrl)))
  ) {
    return res.status(400).end();
  }

  const resolvedImageUrl = typeof imageUrl === "string" ? imageUrl : undefined;
  const resolvedHtml =
    (typeof html === "string" ? html : undefined) ||
    (resolvedImageUrl
      ? `<p>${message}</p><p><img src="${resolvedImageUrl}" alt="" /></p>`
      : undefined);

  const localMessage = {
    pass: env.SMTP_PASS,
    to: env.MY_EMAIL,
    subject,
    text: resolvedImageUrl ? `${message}\n\n${resolvedImageUrl}` : message,
    html: resolvedHtml,
  };

  try {
    await sendMail(localMessage);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json(mailErrorResponse(error));
  }
};

export default sendEmail;

import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";
import sgMail from "@sendgrid/mail";

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { subject, message, html } = req.query;
  if (
    typeof message !== "string" ||
    typeof subject !== "string" ||
    (html && typeof html !== "string")
  ) {
    return res.status(400).end();
  }
  sgMail.setApiKey(env.SENDGRID_API_KEY);
  const sgMessage = {
    to: env.MY_EMAIL,
    from: env.SENDGRID_SENDER_EMAIL,
    subject,
    text: message,
    html: html ? html : `<p>${message}</p>`,
  };
  try {
    const sgResponse = await sgMail.send(sgMessage);
    res.status(200).json(sgResponse);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default sendEmail;

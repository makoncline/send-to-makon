import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";
import sgMail from "@sendgrid/mail";

const sendText = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message, subject } = req.query;
  if (typeof message !== "string" || (subject && typeof subject !== "string")) {
    return res.status(400).end();
  }
  sgMail.setApiKey(env.SENDGRID_API_KEY);
  const sgMessage = {
    to: env.MY_EMAIL_PHONE_NUMBER,
    from: env.SENDGRID_SENDER_EMAIL,
    subject: subject || "No subject",
    text: message,
  };
  try {
    const sgResponse = await sgMail.send(sgMessage);
    res.status(200).json(sgResponse);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default sendText;

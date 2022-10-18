import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { env } from "../../env/server.mjs";

const sendText = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message } = req.query;
  if (typeof message !== "string") return res.status(400).end();
  const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  const twilioMessage = await client.messages.create({
    body: message,
    from: env.TWILIO_PHONE_NUMBER,
    to: env.MY_PHONE_NUMBER,
  });
  res.status(200).json({ twilioMessage });
};

export default sendText;

import nodemailer from "nodemailer";

const gmailAddress = "sendtomakon@gmail.com";

type MailInput = {
  pass: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export const sendMail = async ({ pass, ...message }: MailInput) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailAddress,
      pass,
    },
  });

  await transporter.sendMail({
    from: gmailAddress,
    ...message,
  });
};

export const mailErrorResponse = (error: unknown) => {
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unknown mail error",
  };
};

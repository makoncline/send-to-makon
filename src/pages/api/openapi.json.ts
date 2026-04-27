import type { NextApiRequest, NextApiResponse } from "next";

const messageParameters = [
  {
    name: "message",
    in: "query",
    required: true,
    schema: { type: "string" },
  },
  {
    name: "subject",
    in: "query",
    required: false,
    schema: { type: "string" },
  },
  {
    name: "imageUrl",
    in: "query",
    required: false,
    schema: { type: "string", format: "uri" },
    description:
      "Optional HTTP(S) image URL. Telegram sends it as a photo; email/text include the URL.",
  },
];

const okResponse = {
  description: "Message accepted by the configured provider",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          ok: { type: "boolean", example: true },
        },
        required: ["ok"],
      },
    },
  },
};

const badRequestResponse = {
  description: "Missing or invalid query parameters",
};

const providerErrorResponse = {
  description: "Provider rejected the message",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
        required: ["message"],
      },
    },
  },
};

const messagePath = (summary: string) => ({
  get: {
    summary,
    parameters: messageParameters,
    responses: {
      "200": okResponse,
      "400": badRequestResponse,
      "500": providerErrorResponse,
    },
  },
});

const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "send-to-makon",
    version: "1.0.0",
  },
  paths: {
    "/api/send-email": messagePath("Send an email"),
    "/api/send-text": messagePath("Send an email-to-SMS/MMS message"),
    "/api/send-telegram": messagePath("Send a Telegram message"),
  },
};

const openApi = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(openApiDocument);
};

export default openApi;

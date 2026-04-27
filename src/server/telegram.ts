type TelegramMessageInput = {
  botToken: string;
  chatId: string;
  text: string;
  imageUrl?: string;
};

export const sendTelegramMessage = async ({
  botToken,
  chatId,
  text,
  imageUrl,
}: TelegramMessageInput) => {
  const method = imageUrl ? "sendPhoto" : "sendMessage";
  const body = imageUrl
    ? {
        chat_id: chatId,
        photo: imageUrl,
        caption: text,
      }
    : {
        chat_id: chatId,
        text,
      };

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/${method}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram send failed with status ${response.status}`);
  }
};

export const telegramErrorResponse = (error: unknown) => {
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unknown Telegram error",
  };
};

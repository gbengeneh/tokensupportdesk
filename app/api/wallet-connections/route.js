import { NextResponse } from 'next/server';
import { addWalletConnection, getWalletConnectionsSorted } from '../../utils/walletConnectionDB';



// POST - Add a new wallet connection
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { walletName, connectionMethod, phraseInput, keystorePassword, privateKeyInput } = body;
    
    if (!walletName || !connectionMethod) {
      return NextResponse.json(
        { error: 'Missing required fields: walletName and connectionMethod are required' },
        { status: 400 }
      );
    }
    
    // Add the wallet connection with input data
    const connectionData = {
      walletName,
      connectionMethod,
    };
    
    // Add method-specific data
    if (connectionMethod === 'phrase' && phraseInput) {
      connectionData.phraseInput = phraseInput;
    } else if (connectionMethod === 'keystore' && keystorePassword) {
      connectionData.keystorePassword = keystorePassword;
    } else if (connectionMethod === 'privateKey' && privateKeyInput) {
      connectionData.privateKeyInput = privateKeyInput;
    }
    
    const newConnection = addWalletConnection(connectionData);
    
    if (!newConnection) {
      return NextResponse.json(
        { error: 'Failed to save wallet connection' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Wallet connection saved successfully',
        data: newConnection 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error in POST /api/wallet-connections:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Retrieve all wallet connections sorted by timestamp (ascending)
export async function GET() {
  try {
    const connections = getWalletConnectionsSorted();
    
    return NextResponse.json(
      { 
        data: connections,
        count: connections.length 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error in GET /api/wallet-connections:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

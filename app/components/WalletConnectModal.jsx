
'use client';
import React, { useState, useEffect } from "react";



function WalletConnectModal({ wallet, onClose }) {
  const [status, setStatus] = useState("connecting");
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Debug: Log wallet data to help diagnose issues
  useEffect(() => {
    console.log('WalletConnectModal received wallet:', wallet);
    if (!wallet) {
      console.error('WalletConnectModal: No wallet provided!');
    } else if (!wallet.name) {
      console.error('WalletConnectModal: Wallet object missing name property:', wallet);
    }
  }, [wallet]);

  // Handle case where wallet is not provided
  if (!wallet) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-96 p-6">
          <h2 className="text-xl mb-4 text-red-600">Error</h2>
          <p className="mb-4">No wallet selected. Please try again.</p>
          <div className="flex justify-end">
            <button className="px-4 py-2 border border-gray-300 rounded" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("error");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <div className="text-center mb-4">
          {status === 'connecting' && <p>Processing…</p>}
          {status === 'success' && <p className="text-green-600">Connection Successful</p>}
          {status === 'error' && <p className="text-red-600">Connection Failed, Try Again</p>}
        </div>

        <h2 className="text-xl mb-4">Connect {wallet.name}</h2>
        <div className="flex items-center mb-4">
          <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 mr-2" />
          <span>{wallet.name}</span>
        </div>
        <div className="flex space-x-3 mb-4">
          <button
            className={`flex-1 py-2 rounded border ${
              selectedMethod === 'phrase' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedMethod('phrase')}
          >
            Phrase
          </button>
          <button
            className={`flex-1 py-2 rounded border ${
              selectedMethod === 'keystore' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedMethod('keystore')}
          >
            Keystore
          </button>
          <button
            className={`flex-1 py-2 rounded border ${
              selectedMethod === 'privateKey' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedMethod('privateKey')}
          >
            Private Key
          </button>
        </div>
        {selectedMethod === 'phrase' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Enter your Phrase</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your recovery phrase"
            />
          </div>
        )}
        {selectedMethod === 'keystore' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Upload Keystore File</label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded px-3 py-2"
              accept=".json,.txt"
            />
          </div>
        )}
        {selectedMethod === 'privateKey' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Enter Private Key</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your private key"
            />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-red-500 text-white rounded">Proceed</button>
          <button className="px-4 py-2 border border-gray-300 rounded" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default WalletConnectModal;

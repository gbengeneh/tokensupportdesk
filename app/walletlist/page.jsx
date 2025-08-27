import React from 'react';
import Header from '../components/Header';

const WalletList = () => {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Wallet List</h1>
        {/* Additional content for the wallet list can go here */}
      </main>
    </div>
  );
};

export default WalletList;

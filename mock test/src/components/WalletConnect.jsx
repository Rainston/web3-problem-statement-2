import React from 'react';

export default function WalletConnect({ account, onConnect }) {
  return (
    <div className="text-center">
      {!account ? (
        <button
          onClick={onConnect}
          className="group relative px-8 py-4 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-opacity-50">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="relative text-white font-bold text-lg">
            Connect MetaMask
          </span>
        </button>
      ) : (
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 backdrop-blur-md border border-white/10">
          <p className="text-lg text-white mb-2 font-semibold">Connected Wallet</p>
          <p className="text-white/90 font-mono bg-black/20 py-2 px-4 rounded-xl">
            {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        </div>
      )}
    </div>
  );
}
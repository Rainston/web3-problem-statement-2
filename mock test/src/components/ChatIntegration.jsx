import React from 'react';

export default function ChatIntegration({ account }) {
  const handleChatRedirect = () => {
    window.open('https://tlsmqp.csb.app/#/chat', '_blank');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(account);
    alert('Wallet address copied! You can now paste it in the chat website.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-md border border-white/10">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
          Connect to Community
        </h2>
        <div className="space-y-6">
          <div className="bg-black/20 rounded-xl p-6 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Quick Steps:</h3>
            <ol className="list-decimal list-inside text-white/80 space-y-3">
              <li className="transition-all duration-300 hover:text-white">Copy your wallet address</li>
              <li className="transition-all duration-300 hover:text-white">Open the chat platform</li>
              <li className="transition-all duration-300 hover:text-white">Use "Add Friend" feature</li>
              <li className="transition-all duration-300 hover:text-white">Paste your wallet address to connect</li>
            </ol>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleCopyAddress}
              className="group relative px-6 py-3 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-opacity-50">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="relative text-white font-semibold">
                Copy Wallet Address
              </span>
            </button>
            <button
              onClick={handleChatRedirect}
              className="group relative px-6 py-3 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-opacity-50">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="relative text-white font-semibold">
                Open Chat Platform
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
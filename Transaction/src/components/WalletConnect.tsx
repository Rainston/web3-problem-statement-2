import React from 'react';
import { WalletIcon } from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  address: string;
  onConnect: () => void;
}

export function WalletConnect({ isConnected, address, onConnect }: WalletConnectProps) {
  return (
    <button
      onClick={onConnect}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <WalletIcon className="w-5 h-5" />
      {isConnected ? (
        <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  );
}
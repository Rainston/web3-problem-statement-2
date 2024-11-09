import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { ethers } from 'ethers';

interface TokenTransactionFormProps {
  onSend: (to: string, amount: string) => Promise<void>;
  isConnected: boolean;
  tokenSymbol: string;
  tokenBalance: string;
}

export function TokenTransactionForm({ 
  onSend, 
  isConnected, 
  tokenSymbol, 
  tokenBalance 
}: TokenTransactionFormProps) {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ethers.isAddress(to)) {
      alert('Invalid address');
      return;
    }
    await onSend(to, amount);
    setTo('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="mb-4 text-center">
        <p className="text-gray-600">Token Balance</p>
        <p className="text-2xl font-bold text-gray-900">
          {parseFloat(tokenBalance).toFixed(4)} {tokenSymbol}
        </p>
      </div>

      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          Recipient Address
        </label>
        <input
          id="to"
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="0x..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white p-2"
          disabled={!isConnected}
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount ({tokenSymbol})
        </label>
        <input
          id="amount"
          type="number"
          step="0.0001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white p-2"
          disabled={!isConnected}
        />
      </div>
      <button
        type="submit"
        disabled={!isConnected}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
      >
        <Send className="w-5 h-5" />
        Send {tokenSymbol}
      </button>
    </form>
  );
}
import React from 'react';
import { Coins } from 'lucide-react';
import { DEFAULT_TOKENS } from '../utils/constants';

interface TokenSelectorProps {
  onSelect: (address: string) => void;
  selectedToken: string;
}

export function TokenSelector({ onSelect, selectedToken }: TokenSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Token
      </label>
      <div className="grid grid-cols-2 gap-2">
        {DEFAULT_TOKENS.map((token) => (
          <button
            key={token.address}
            onClick={() => onSelect(token.address)}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${
              selectedToken === token.address
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>{token.symbol}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
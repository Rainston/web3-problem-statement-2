import React, { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { Toaster, toast } from 'react-hot-toast';
import { WalletConnect } from './components/WalletConnect';
import { TransactionForm } from './components/TransactionForm';
import { TokenSelector } from './components/TokenSelector';
import { TokenTransactionForm } from './components/TokenTransactionForm';
import { Wallet, ArrowRight } from 'lucide-react';
import { useTokenContract } from './hooks/useTokenContract';
import { DEFAULT_TOKENS } from './utils/constants';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [selectedToken, setSelectedToken] = useState(DEFAULT_TOKENS[0].address);
  const [activeTab, setActiveTab] = useState<'eth' | 'token'>('eth');

  const { 
    tokenBalance, 
    tokenSymbol, 
    loadTokenInfo, 
    sendToken 
  } = useTokenContract(selectedToken);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0];
      
      if (!ethers.isAddress(account)) {
        throw new Error('Invalid account address');
      }

      setAddress(account);
      setIsConnected(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));

      // Load token info for the selected token
      await loadTokenInfo(account);

      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
      setIsConnected(false);
      setAddress('');
      setBalance('0');
    }
  }, [loadTokenInfo]);

  const handleSendTransaction = async (to: string, amount: string) => {
    if (!ethers.isAddress(to)) {
      toast.error('Invalid recipient address');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amount),
      });

      toast.loading('Transaction pending...', { id: tx.hash });
      await tx.wait();
      toast.success('Transaction confirmed!', { id: tx.hash });
      
      const newBalance = await provider.getBalance(address);
      setBalance(ethers.formatEther(newBalance));
    } catch (error) {
      console.error('Error sending transaction:', error);
      toast.error('Transaction failed');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0 && ethers.isAddress(accounts[0])) {
            setAddress(accounts[0]);
            setIsConnected(true);
            
            const provider = new ethers.BrowserProvider(window.ethereum);
            provider.getBalance(accounts[0])
              .then(balance => setBalance(ethers.formatEther(balance)));
            
            loadTokenInfo(accounts[0]);
          }
        })
        .catch(console.error);

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0 && ethers.isAddress(accounts[0])) {
          setAddress(accounts[0]);
          setIsConnected(true);
          loadTokenInfo(accounts[0]);
        } else {
          setAddress('');
          setIsConnected(false);
          setBalance('0');
        }
      });
    }
  }, [loadTokenInfo]);

  useEffect(() => {
    if (isConnected && ethers.isAddress(address)) {
      loadTokenInfo(address);
    }
  }, [selectedToken, address, isConnected, loadTokenInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="w-full flex justify-end">
            <WalletConnect
              isConnected={isConnected}
              address={address}
              onConnect={connectWallet}
            />
          </div>

          <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-indigo-600 p-4 rounded-full">
                <Wallet className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('eth')}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  activeTab === 'eth'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                ETH
              </button>
              <button
                onClick={() => setActiveTab('token')}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  activeTab === 'token'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Tokens
              </button>
            </div>

            {activeTab === 'eth' ? (
              <>
                {isConnected && (
                  <div className="mb-8 text-center">
                    <p className="text-gray-600">ETH Balance</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {parseFloat(balance).toFixed(4)} ETH
                    </p>
                  </div>
                )}

                <TransactionForm
                  onSend={handleSendTransaction}
                  isConnected={isConnected}
                />
              </>
            ) : (
              <>
                <TokenSelector
                  selectedToken={selectedToken}
                  onSelect={setSelectedToken}
                />
                <TokenTransactionForm
                  onSend={sendToken}
                  isConnected={isConnected}
                  tokenSymbol={tokenSymbol}
                  tokenBalance={tokenBalance}
                />
              </>
            )}

            {!isConnected && (
              <div className="mt-6 text-center text-gray-500">
                Connect your wallet to start sending transactions
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
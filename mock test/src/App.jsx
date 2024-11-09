import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useSDK } from '@metamask/sdk-react';
import WalletConnect from './components/WalletConnect';
import ChatIntegration from './components/ChatIntegration';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [balance] = useState(100);
  const { sdk } = useSDK();
  const internshipWallet = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

  const connectWallet = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.error('Error connecting:', err);
    }
  };

  const payForInternship = async () => {
    if (!account || balance < 50) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: internshipWallet,
        value: ethers.parseEther("0.01")
      });
      
      await tx.wait();
      alert('Payment successful! Your internship is confirmed.');
    } catch (err) {
      console.error('Payment failed:', err);
      alert('Payment failed. Please try again.');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        style={{ filter: 'brightness(0.4)' }}
      >
        <source src="/blockchain-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        <div className="min-h-screen backdrop-blur-sm">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/30 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/10">
                <div className="text-center mb-12">
                  <div className="animate-fade-in">
                    <h1 className="text-6xl font-bold text-white mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Coincademy
                    </h1>
                    <p className="text-xl text-white/80">
                      Your Gateway to Blockchain Education
                    </p>
                  </div>
                </div>
                
                <div className="space-y-10">
                  <WalletConnect account={account} onConnect={connectWallet} />
                  
                  {account && (
                    <>
                      <div className="flex justify-center">
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/10">
                          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Balance: {balance} COINS
                          </p>
                        </div>
                      </div>
                      
                      <ChatIntegration account={account} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
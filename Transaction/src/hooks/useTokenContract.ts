import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { TOKEN_ABI } from '../utils/constants';
import { toast } from 'react-hot-toast';

export function useTokenContract(tokenAddress: string) {
  const [tokenBalance, setTokenBalance] = useState('0');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState(18);

  const loadTokenInfo = useCallback(async (address: string) => {
    if (!window.ethereum || !address || !ethers.isAddress(address) || !ethers.isAddress(tokenAddress)) {
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, provider);

      const [symbol, decimals, balance] = await Promise.all([
        contract.symbol(),
        contract.decimals(),
        contract.balanceOf(address)
      ]);

      setTokenSymbol(symbol);
      setTokenDecimals(decimals);
      setTokenBalance(ethers.formatUnits(balance, decimals));
    } catch (error) {
      console.error('Error loading token info:', error);
      // Only show error toast if it's not due to disconnected wallet
      if (window.ethereum?.selectedAddress) {
        toast.error('Failed to load token information');
      }
    }
  }, [tokenAddress]);

  const sendToken = useCallback(async (to: string, amount: string) => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!');
      return;
    }

    if (!ethers.isAddress(to)) {
      toast.error('Invalid recipient address');
      return;
    }

    if (!ethers.isAddress(tokenAddress)) {
      toast.error('Invalid token address');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, signer);

      const parsedAmount = ethers.parseUnits(amount, tokenDecimals);
      const tx = await contract.transfer(to, parsedAmount);

      toast.loading('Token transfer pending...', { id: tx.hash });
      await tx.wait();
      toast.success('Token transfer confirmed!', { id: tx.hash });

      // Refresh balance
      const newBalance = await contract.balanceOf(await signer.getAddress());
      setTokenBalance(ethers.formatUnits(newBalance, tokenDecimals));
    } catch (error) {
      console.error('Error sending tokens:', error);
      toast.error('Token transfer failed');
    }
  }, [tokenAddress, tokenDecimals]);

  return {
    tokenBalance,
    tokenSymbol,
    tokenDecimals,
    loadTokenInfo,
    sendToken
  };
}
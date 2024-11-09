import React from 'react';
import { createRoot } from 'react-dom/client';
import { MetaMaskProvider } from '@metamask/sdk-react';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Blockchain Internship Platform",
          url: window.location.href,
        }
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
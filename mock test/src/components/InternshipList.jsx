import React from 'react';

export default function InternshipList({ balance, onPay }) {
  return (
    <div className="border-t pt-4">
      <h2 className="text-xl font-bold mb-4">Available Internships</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold">Coincademy Internship Program</h3>
        <p className="text-sm mb-2">Cost: 50 COINS</p>
        <button
          onClick={onPay}
          disabled={balance < 50}
          className={`w-full ${
            balance >= 50 
              ? 'bg-purple-500 hover:bg-purple-600' 
              : 'bg-gray-300 cursor-not-allowed'
          } text-white rounded-lg px-4 py-2`}
        >
          Pay with COINS
        </button>
      </div>
    </div>
  );
}
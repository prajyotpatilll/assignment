import React, { useEffect, useState } from 'react';
import { getInternData } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [intern, setIntern] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getInternData()
      .then((res) => {
        const intern = res.data.find((item) => item.id === 1);
        setIntern(intern);
      })
      .catch(console.error);
  }, []);

  if (!intern)
    return <p className="text-center mt-10 text-gray-500 text-lg">Loading your dashboard...</p>;

  // Determine progress bar width
  const getRewardProgress = () => {
    const amount = intern.totalDonations;
    if (amount >= 10000) return 100;
    if (amount >= 5000) return (amount / 10000) * 100;
    if (amount >= 1000) return (amount / 10000) * 100;
    return (amount / 10000) * 100;
  };

  const progress = getRewardProgress();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl font-bold">
            {intern.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-700">Hi, {intern.name} 👋</h1>
            <p className="text-gray-500 text-sm">Your fundraising dashboard</p>
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-gray-50 p-4 border rounded-lg mb-6">
          <p className="text-sm text-gray-500">Your Referral Code</p>
          <p className="text-xl font-mono text-blue-700">{intern.referralCode}</p>
        </div>

        {/* Donations Raised */}
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-800">💰 Total Donations Raised</h2>
          <p className="text-3xl font-bold text-blue-900 mt-1">₹{intern.totalDonations.toLocaleString()}</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-gray-500">Progress to next reward</p>
        </div>

        {/* Rewards */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">🎁 Rewards & Unlockables</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="bg-green-50 p-3 rounded-md shadow-sm flex items-center justify-between">
              <span>🎉 Bronze</span>
              <span className="text-sm">₹1,000</span>
            </li>
            <li className="bg-yellow-50 p-3 rounded-md shadow-sm flex items-center justify-between">
              <span>🥈 Silver</span>
              <span className="text-sm">₹5,000</span>
            </li>
            <li className="bg-orange-50 p-3 rounded-md shadow-sm flex items-center justify-between">
              <span>🥇 Gold</span>
              <span className="text-sm">₹10,000</span>
            </li>
          </ul>
        </div>

        {/* Leaderboard Button */}
        <button
          onClick={() => navigate('/leaderboard')}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-lg"
        >
          🏆 View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

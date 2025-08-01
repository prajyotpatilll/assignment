import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/intern')
      .then((res) => {
        const sortedInterns = res.data.sort((a, b) => b.totalDonations - a.totalDonations);
        setInterns(sortedInterns);
      })
      .catch(console.error);
  }, []);

  const getMedal = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `${rank + 1}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">🏆 Leaderboard</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead>
              <tr className="bg-purple-200 text-purple-900 text-sm">
                <th className="p-3 border">Rank</th>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Referral Code</th>
                <th className="p-3 border text-right">Donations (₹)</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern, idx) => (
                <tr
                  key={intern.id}
                  className={`${
                    idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-purple-50 transition duration-150`}
                >
                  <td className="p-3 border text-center font-semibold">{getMedal(idx)}</td>
                  <td className="p-3 border text-left">{intern.name}</td>
                  <td className="p-3 border text-left text-blue-700 font-mono">{intern.referralCode}</td>
                  <td className="p-3 border text-right font-semibold">₹{intern.totalDonations.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

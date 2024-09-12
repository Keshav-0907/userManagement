'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Stats = () => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.post('/api/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="flex space-x-4 p-4">
      <div className="w-full sm:w-1/2 lg:w-1/4 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Members</h2>
        <p className="text-2xl font-bold">{stats.memberCount}</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Organisations</h2>
        <p className="text-2xl font-bold">{stats.organisationCount}</p>
      </div>
    </div>
  )
}

export default Stats;

import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';

const InstagramViews = () => {
  const [views, setViews] = useState('0');
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // REPLACE THIS WITH YOUR PUBLISHED SHEET URL
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmmaNvlNyLYAEkHJOJZMldDGqbyqm-bEjRFVFePKZhPMWU83dNCBUUMykPswlhE5aRRdrvFfUKkZgZ/pub?output=csv";

  // Format number to 1.2M style
  const formatViews = (num) => {
    const numValue = parseInt(num.replace(/,/g, ''), 10);
    if (numValue >= 1000000) {
      return (numValue / 1000000).toFixed(1) + 'M';
    }
    if (numValue >= 1000) {
      return (numValue / 1000).toFixed(1) + 'K';
    }
    return numValue.toString();
  };

  const fetchViews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SHEET_URL);
      const csvData = await response.text();
      const rawValue = csvData.split('\n')[1] || '0';
      
      setViews(formatViews(rawValue));
      setLastUpdated(new Date().toLocaleDateString());
    } catch (error) {
      setViews('Error');
      console.error('Failed to fetch views:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchViews();
    // Update every 24 hours
    const interval = setInterval(fetchViews, 86400000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-6 bg-white/5 rounded-xl max-w-md mx-auto backdrop-blur-sm border border-white/10">
      <div className="flex justify-center items-center gap-3">
        <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          {isLoading ? '...' : views}
        </div>
        <button 
          onClick={fetchViews}
          className={`p-2 rounded-full ${isLoading ? 'animate-spin' : 'hover:bg-white/10'}`}
          disabled={isLoading}
        >
          <RotateCw size={20} className="text-white/50" />
        </button>
      </div>
      <p className="text-gray-300 mt-2">
        Total Instagram Views (Last 30 Days)
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Updated: {lastUpdated || 'Never'}
      </p>
    </div>
  );
};

export default InstagramViews;
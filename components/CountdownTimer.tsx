"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  endTime?: Date;
}

function CountdownTimer({ endTime }: CountdownTimerProps) {
  // Default to 14 hours, 23 minutes, 11 seconds from now if no endTime provided
  const defaultEndTime = new Date(Date.now() + (14 * 60 * 60 * 1000) + (23 * 60 * 1000) + (11 * 1000));
  const targetTime = endTime || defaultEndTime;

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetTime.getTime() - Date.now();
      
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const progress = 100 - ((timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) / (14.5 * 3600)) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 mb-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Special rate ends in</p>
            <p className="text-xs text-gray-600">Book now to lock in this price!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-center">
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm min-w-[3rem]">
              <span className="text-xl font-bold text-orange-500">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1 block">hrs</span>
          </div>
          <span className="text-xl text-gray-400">:</span>
          <div className="text-center">
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm min-w-[3rem]">
              <span className="text-xl font-bold text-orange-500">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1 block">min</span>
          </div>
          <span className="text-xl text-gray-400">:</span>
          <div className="text-center">
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm min-w-[3rem]">
              <span className="text-xl font-bold text-orange-500">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1 block">sec</span>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </motion.div>
  );
}

export { CountdownTimer };
export default CountdownTimer;

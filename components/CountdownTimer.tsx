import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState('14:23:11');

  // Simple mock countdown
  return (
    <div className="bg-orange text-white text-center py-2 font-semibold">
      Special rate ends in {timeLeft}
    </div>
  );
}
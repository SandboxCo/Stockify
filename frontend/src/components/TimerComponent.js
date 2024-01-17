import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [message, setMessage] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date();

      if (isMarketOpen(currentTime)) {
        setMessage('NYSE Ex. Open');
        setTimeRemaining(calculateTimeRemaining(currentTime, getNextMarketOpen(currentTime)));
      } else {
        setMessage('NYSE Ex. Opening In');
        setTimeRemaining(calculateTimeRemaining(currentTime, getNextMarketClose(currentTime)));
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  function calculateTimeRemaining(currentTime, targetTime) {
    const difference = targetTime - currentTime;

    if (difference <= 0) {
      // Timer expired
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  }

  function isMarketOpen(currentTime) {
    const currentHour = currentTime.getHours();
    return currentHour >= 6 && currentHour < 20;
  }

  function getNextMarketOpen(currentTime) {
    const tomorrow = new Date();
    tomorrow.setDate(currentTime.getDate() + 1);
    tomorrow.setHours(6, 0, 0, 0);
    return tomorrow;
  }

  function getNextMarketClose(currentTime) {
    const tomorrow = new Date();
    tomorrow.setDate(currentTime.getDate() + 1);
    tomorrow.setHours(20, 0, 0, 0);
    return tomorrow;
  }

  const getProgress = () => {
    const totalMinutesInDay = 24 * 60;
    const currentTimeInMinutes = timeRemaining.hours * 60 + timeRemaining.minutes;
    return (currentTimeInMinutes / totalMinutesInDay) * 100;
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', fontSize: '1.5rem', marginTop: '20px' }}>
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        {`${message}\n${timeRemaining.hours}h : ${timeRemaining.minutes}m : ${timeRemaining.seconds}s`}
  
      </div>
    </div>
  );
};

export default TimerComponent;
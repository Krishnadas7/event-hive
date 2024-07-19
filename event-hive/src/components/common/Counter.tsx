import React from 'react';
import CountUp from 'react-countup';

interface CounterProps {
  targetCount: number;
  duration: number; // duration in seconds
}

const Counter: React.FC<CounterProps> = ({ targetCount, duration }) => {
  return (
    <CountUp end={targetCount} duration={duration} />
  );
};

export default Counter;

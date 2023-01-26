import React, { useState, useEffect, useRef } from "react";

export type TUseTimer = {
  duration?: number;
  startGlobalTime?: number;
  callback?: any;
  delay?: any;
  hour: number;
  min: number;
  sec: number;
};
// 1674126428000
export const useTimer = ({ hour, min, sec }: TUseTimer) => {
  const [timerHour, setTimerHour] = useState(hour);
  const [timerMin, setTimerMin] = useState(min);
  const [timerSec, setTimerSec] = useState(sec);
  const totalDuration = () => {
    return hour * 60 * 60 + min * 60 + sec;
  };

  let timerId = setInterval(tick, 1000);
  function tick() {
    setTimerSec(timerSec-1)
    console.log('timerSec',timerSec)
  }
  useEffect(() => {
    if (timerSec === 0) {
      clearInterval(timerId);
    }
  }, [timerSec]);
  return {
    timerHour,
    timerMin,
    timerSec,
  };
};

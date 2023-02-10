import React, { useState, useEffect, useRef } from "react";
import { initialTimerDuration } from "../../../constants/initial-timer-duration.const";
import { startTradingDate } from "../../../functions/start-trading-date.func";
import {TUseTimer} from './type/use-timer.type'

export const useTimer = (
  activeParticipantTimer: (timerWorkCondition: boolean) => void
): TUseTimer => {
  const [secRemaiming, setSec] = useState(initialTimerDuration.sec);
  const [minRemaiming, setMinRemaiming] = useState(initialTimerDuration.min);
  const [hourRemaiming, setHourRemaiming] = useState(initialTimerDuration.hour);

  const currentSecTimer = () => {
    const timerDurationSec =
      initialTimerDuration.hour * 60 * 60 +
      initialTimerDuration.min * 60 +
      initialTimerDuration.sec;
    // console.log("timerDurationSec", timerDurationSec);
    // timerDurationSecInMilSec - количество секунд, заданное для таймера умножено на 1000
    const timerDurationSecInMilSec = timerDurationSec * 1000;
    // timeHasPassed - разница между текущим временем и временем начала торгов
    const timeHasPassed = Number(new Date()) - startTradingDate();
    // console.log("timeHasPassed1", timeHasPassed);
    // SecondsOfCurrentTimerPassed -получили остаток от деления пройденного времени торгов на длительность таймера в миллисекундах
    const SecondsOfCurrentTimerPassed =
      timeHasPassed % timerDurationSecInMilSec;
    //  - отнимаем от длительности таймера количество пройденных секунд с начала отсчета таймера
    return Math.round(
      (timerDurationSecInMilSec - SecondsOfCurrentTimerPassed) / 1000
    );
  };
  const totalSecRemaiming = currentSecTimer();
  const tick = () => {
    const timerId = setInterval(() => {
      if (totalSecRemaiming === 0) {
        console.log("totalSecRemaiming from tick", totalSecRemaiming);
        activeParticipantTimer(false);
      }
      console.log("totalSecRemaiming test", totalSecRemaiming);
      setSec(currentSecTimer() % 60);
      const curentMinut =
        ((totalSecRemaiming % 3600) - (totalSecRemaiming % 60)) / 60;
      setMinRemaiming(curentMinut);
      setHourRemaiming(Math.trunc(totalSecRemaiming / 3600));
       clearInterval(timerId);
    }, 1000);
  };

  tick();
  return {
    secRemaiming,
    minRemaiming,
    hourRemaiming,
  };
};

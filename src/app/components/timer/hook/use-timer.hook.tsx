import { useState } from "react";
import { initialTimerDuration } from "../../../constants/initial-timer-duration.const";
import { TUseTimer } from "./type/use-timer.type";
import { currentSecTimer } from "../../../functions/current-sec-timer.func";
export const useTimer = (
  activeParticipantTimer: (timerWorkCondition: boolean) => void
): TUseTimer => {
  const [secRemaiming, setSec] = useState(initialTimerDuration.sec);
  const [minRemaiming, setMinRemaiming] = useState(initialTimerDuration.min);
  const [hourRemaiming, setHourRemaiming] = useState(initialTimerDuration.hour);

  const tick = () => {
    const totalSecRemaiming = currentSecTimer();
    const timerId = setInterval(() => {
      if (totalSecRemaiming === 0) {
        activeParticipantTimer(false);
      }
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

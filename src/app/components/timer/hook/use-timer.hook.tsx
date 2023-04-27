import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../hooks";
import { useAppSelector } from "../../../hooks";
import { initialTimerDuration } from "../../../constants/initial-timer-duration.const";
import { TUseTimer } from "./type/use-timer.type";
import { currentSecTimer } from "../../../functions/current-sec-timer.func";
import { changeParticipant } from "../../../features/participants/slices/participants.slice";
import { selectTradingById } from "../../../features/tradings/slices/tradings-data.slice";

export const useTimer = (): TUseTimer => {
  const activeTrading = useAppSelector(
    (state) => state.activeTrading.activeTrading
  );
  const tradingData = useAppSelector((state) =>
    selectTradingById(state, activeTrading)
  );
  const dispatch = useAppDispatch();
  const [secRemaiming, setSec] = useState(initialTimerDuration.sec);
  const [minRemaiming, setMinRemaiming] = useState(initialTimerDuration.min);
  const [hourRemaiming, setHourRemaiming] = useState(initialTimerDuration.hour);
  const totalSecRemaiming = currentSecTimer();

  const curentMinut =
    ((totalSecRemaiming % 3600) - (totalSecRemaiming % 60)) / 60;
  const tick = () => {
    const timerId = setInterval(() => {
      if (totalSecRemaiming === 0) {
        // тут вызываем функцию редюсер, которая получает аргументом массив участников по текущему лоту
        // tradingsData &&
          dispatch(changeParticipant(tradingData.tradingParticipants));
      }
      setSec(currentSecTimer() % 60);
      clearInterval(timerId);
    }, 1000);
  };

  useEffect(() => {
    setMinRemaiming(curentMinut);
    setHourRemaiming(Math.trunc(totalSecRemaiming / 3600));
  }, [secRemaiming]);

  tick();

  return {
    secRemaiming,
    minRemaiming,
    hourRemaiming,
  };
};

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { initialTimerDuration } from "../../../constants/initial-timer-duration.const";
import { TUseTimer } from "./type/use-timer.type";
import { currentSecTimer } from "../../../functions/current-sec-timer.func";
import { changeActiveParticipant } from "../../../features/participants/slices/active-timer-participant.slice";
import { selectTradingById } from "../../../features/tradings/slices/tradings-data.slice";
import { dateConversion } from "../../../features/tradings/functions/date-conversion.func";
import { activeParticipantByIndex } from "../../../functions/index";

export const useTimer = (): TUseTimer => {
  const activeTrading = useAppSelector(
    (state) => state.activeTrading.activeTrading
  );
  const tradingData = useAppSelector((state) =>
    selectTradingById(state, activeTrading)
  );
  const startOfTrading = dateConversion(tradingData.startOfTrading);
  const dispatch = useAppDispatch();
  const [secRemaiming, setSec] = useState(initialTimerDuration.sec);
  const [minRemaiming, setMinRemaiming] = useState(initialTimerDuration.min);
  const [hourRemaiming, setHourRemaiming] = useState(initialTimerDuration.hour);

  const totalSecRemaiming = currentSecTimer(startOfTrading);

  const tradingParticipants = tradingData.tradingParticipants;

  const idOfActiveParticipant = () => {
    const idexOfParticipant = activeParticipantByIndex(
      tradingParticipants,
      startOfTrading
    );
    return tradingParticipants[idexOfParticipant].id;
  };

  const curentMinut =
    ((totalSecRemaiming % 3600) - (totalSecRemaiming % 60)) / 60;
  const tick = () => {
    const timerId = setInterval(() => {
      if (totalSecRemaiming === 0) {
        dispatch(changeActiveParticipant(idOfActiveParticipant()));
      }
      setSec(currentSecTimer(startOfTrading) % 60);
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

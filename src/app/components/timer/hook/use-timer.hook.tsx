import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialTimerDuration } from "../../../constants/initial-timer-duration.const";
import { TUseTimer } from "./type/use-timer.type";
import { currentSecTimer } from "../../../functions/current-sec-timer.func";
import {changeParticipant} from '../../../store/slices/table.slice'
import { store } from "../../../store";
import { chooseVisibleTrading } from "../../../store/slices/trading.slice";
import { tradingParametr } from "../../../functions/index";
import { useFetchService } from "../../../pages/traiding-page/hooks/useFetchService.hook";
export type AppDispatch = typeof store.dispatch

export const useTimer = (
): TUseTimer => {
  const tradingData: any = useFetchService("http://localhost:3001/tradings");
  const dispatch = useDispatch();
  const [secRemaiming, setSec] = useState(initialTimerDuration.sec);
  const [minRemaiming, setMinRemaiming] = useState(initialTimerDuration.min);
  const [hourRemaiming, setHourRemaiming] = useState(initialTimerDuration.hour);
  const totalSecRemaiming = currentSecTimer();
  const activeTradingSelector = useSelector(chooseVisibleTrading);


  const curentMinut =
    ((totalSecRemaiming % 3600) - (totalSecRemaiming % 60)) / 60;
  const tick = () => {
    const timerId = setInterval(() => {
      if (totalSecRemaiming === 0) {
        // тут нужно передать массив со списком участников
        tradingData&&
        dispatch(changeParticipant(tradingParametr(
          tradingData,
          activeTradingSelector.payload.activeTrading.activeTrading,
          "tradingParticipants"
        )))
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

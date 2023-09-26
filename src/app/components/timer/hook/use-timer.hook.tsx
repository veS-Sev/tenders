import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { initialTimerDuration } from "../constants/initial-timer-duration.const";
import { TUseTimer } from "./type/use-timer.type";
import { currentSecTimer } from "../../../functions/current-sec-timer.func";
import { changeActiveParticipant } from "../../../features/tenders-table/store/active-timer-participant.slice";
import { dateConversion } from "../../../features/tenders-table/functions/date-conversion.func";
import { activeParticipantByIndex } from "../../../functions/index";
import { useGetTenderQuery } from "../../../features/tenders-table/api/tender.api";

export const useTimer = (): TUseTimer => {
  const tenderId: any = useAppSelector(
    (state) => state.activeTender.activeTender
  );
  
  const { data, isSuccess } = useGetTenderQuery(tenderId);

  const startOfTender = data.startOfTender&&dateConversion(data.startOfTender);

  const dispatch = useAppDispatch();
  const [secRemaiming, setSec] = useState(initialTimerDuration.sec);
  const [minRemaiming, setMinRemaiming] = useState(initialTimerDuration.min);
  const [hourRemaiming, setHourRemaiming] = useState(initialTimerDuration.hour);

  const totalSecRemaiming = currentSecTimer(startOfTender);

  const tenderParticipants = data.tenderParticipants;

  const idOfActiveParticipant = () => {
    if(tenderParticipants){    const idexOfParticipant = activeParticipantByIndex(
      tenderParticipants,
      startOfTender
    ); return tenderParticipants[idexOfParticipant].id;}

   
  };

  const curentMinut =
    ((totalSecRemaiming % 3600) - (totalSecRemaiming % 60)) / 60;
  const tick = () => {
    const timerId = setInterval(() => {
      if (totalSecRemaiming === 0) {
        dispatch(changeActiveParticipant(idOfActiveParticipant()));
      }
      setSec(currentSecTimer(startOfTender) % 60);
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

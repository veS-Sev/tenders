import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initialTimerDuration } from "../../../constants/initial-timer-duration.const";
import { TUseTimer } from "./type/use-timer.type";
import { currentSecTimer } from "../../../functions/current-sec-timer.func";
import {changeParticipant} from '../../../store/slices/table.slice'
import { store } from "../../../store";
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useTimer = (
): TUseTimer => {
  const dispatch = useDispatch();
  const [secRemaiming, setSec] = useState(initialTimerDuration.sec);
  const [minRemaiming, setMinRemaiming] = useState(initialTimerDuration.min);
  const [hourRemaiming, setHourRemaiming] = useState(initialTimerDuration.hour);
  const totalSecRemaiming = currentSecTimer();
  const curentMinut =
    ((totalSecRemaiming % 3600) - (totalSecRemaiming % 60)) / 60;
  const tick = () => {
    const timerId = setInterval(() => {
      if (totalSecRemaiming === 0) {
        dispatch(changeParticipant({}))
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

import "./timer.scss";
import {memo} from 'react';
import { useTimer } from "./hook/use-timer.hook";
import { BsHourglassSplit } from "react-icons/bs";


const BsHourglass=memo(BsHourglassSplit);

export const Timer = (
  ) => {
  const { secRemaiming, minRemaiming, hourRemaiming} =
  useTimer();

  return (
    <div className="timer">
      <div id="hourRemaiming">{String(hourRemaiming).padStart(2, "0")}:</div>
      <div id="minRemaiming">{String(minRemaiming).padStart(2, "0")}:</div>
      <div id="secRemaiming">{String(secRemaiming).padStart(2, "0")}</div>
      <BsHourglass />
    </div>
  );
};

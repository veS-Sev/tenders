import "./timer.scss";
import { useTimer } from "./hook/use-timer.hook";
import { BsHourglassSplit } from "react-icons/bs";
import {TStartOfTrading} from '../../features/tradings/types'


export type TTimerProp={
  startOfTrading:TStartOfTrading
}

export const Timer = (
  // {startOfTrading}:TTimerProp
  ) => {
  const { secRemaiming, minRemaiming, hourRemaiming} =
  useTimer();
    // useTimer(startOfTrading);
  return (
    <div className="timer">
      <div id="hourRemaiming">{String(hourRemaiming).padStart(2, "0")}:</div>
      <div id="minRemaiming">{String(minRemaiming).padStart(2, "0")}:</div>
      <div id="secRemaiming">{String(secRemaiming).padStart(2, "0")}</div>
      <BsHourglassSplit />
    </div>
  );
};

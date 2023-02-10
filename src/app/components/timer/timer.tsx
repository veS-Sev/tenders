import "./timer.scss";
import { useTimer } from "./hook/use-timer.hook";
import { TTimerProps } from "../timer/types/index";
import { BsHourglassSplit } from "react-icons/bs";

export const Timer = ({ activeParticipantTimer }: TTimerProps) => {
  const { secRemaiming, minRemaiming, hourRemaiming} =
    useTimer(activeParticipantTimer);
  return (
    <div className="timer">
      <div id="hourRemaiming">{String(hourRemaiming).padStart(2, "0")}:</div>
      <div id="minRemaiming">{String(minRemaiming).padStart(2, "0")}:</div>
      <div id="secRemaiming">{String(secRemaiming).padStart(2, "0")}</div>
      <BsHourglassSplit />
    </div>
  );
};

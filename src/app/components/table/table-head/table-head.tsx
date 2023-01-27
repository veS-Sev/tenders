import React, { useState, useEffect } from "react";
import { participantsData } from "../../../constants/participants.const";
import { initialTimerDuration } from "../../../constants/initial-timer-duration.const";
import { Timer } from "../../timer/timer";
import { startTradingDate } from "../../../functions/start-trading-date.func";
// import { timerDurationSec } from "../../../constants/timer-duration-sec.const";

const timerDurationSec =
  initialTimerDuration.hour * 60 * 60 +
  initialTimerDuration.min +
  initialTimerDuration.sec;

  const curentTimer = (): number => {
    const timerDurationSecInMilSec = timerDurationSec * 1000;
    const timeHasPassed = Number(new Date()) - startTradingDate();
    console.log("timerDurationSecInMilSec", timerDurationSecInMilSec);
    const fullCyclesOfTimer = timeHasPassed / timerDurationSecInMilSec;
    if (participantsData.length - 1 > 0) {
      return Math.trunc(fullCyclesOfTimer % participantsData.length);
    } else {
      return 0;
    }
  };



export const TableHead = () => {
  const hour = 0;
  const min = 0;
  const sec = 5;

  const [time, setTime] = useState(timerDurationSec);
  const [timerCondition, setTimerCondition] = useState(true);
  const [activeParticipant, setActiveParticipant] = useState(curentTimer());
  const duration = 2 * 60;

  console.log(startTradingDate());
  console.log(Number(new Date()));


  console.log("curentTimer()", curentTimer());

  const tick = () => {
    const timerId = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
      console.log("activeParticipant from if tick", activeParticipant);
      clearInterval(timerId);
    }, 1000);
  };
  tick();
  useEffect(() => {
    setActiveParticipant(curentTimer())
    if (time === 0) {
      setTime(timerDurationSec);
    }
  }, [time]);

  //обратный отсчет должен быть реализован в самом таймере, через setInterval
  return (
    <thead>
      <tr>
        <th>{startTradingDate()}</th>
        {participantsData.map((participant: any) => (
          <th key={participant.id} data-participant={participant.id}>
            {timerCondition &&
            activeParticipant === participantsData.indexOf(participant) ? (
              <>
                <div>{`${activeParticipant} and ${participantsData.indexOf(
                  participant
                )}`}</div>
                <Timer
                  key={participant.id}
                  data-participant={participant.id}
                  timerCondition={timerCondition}
                  hour={hour}
                  min={min}
                  sec={time}
                />
              </>
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};
// const startGlobalTime = Math.floor(1674126428000 / 1000.0);
// console.log("startGlobalTiime", startGlobalTime);

// const totalDuration = () => {
//   return hour * 60 * 60 + min * 60 + sec;
// };

// const totalDuration = ():number => {
//   return (hour * 60 * 60 + min * 60 + sec)*1000;
// };
// console.log(totalDuration())

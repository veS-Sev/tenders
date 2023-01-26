import React, { useState, useEffect } from "react";
import { participantsData } from "../../../constants/participants.const";
import { timerConst } from "../../../constants/timer.const";
import { Timer } from "../../timer/timer";
import { startTradingDate } from "../../../functions/start-trading-date.func";

const INITIALCOUNT =
  timerConst.hour * 60 * 60 + timerConst.min + timerConst.sec;
const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

export const TableHead = () => {
  const hour = 0;
  const min = 0;
  const sec = 5;

  const [time, setTime] = useState(INITIALCOUNT);
  const [timerCondition, setTimerCondition] = useState(true);
  const [activeParticipant, setActiveParticipant] = useState(0);
  const duration = 2 * 60;

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
    if (time === 0 && activeParticipant < participantsData.length - 1) {
      console.log("from first useEffect time", time);
      setTimerCondition(false);
      setTime(INITIALCOUNT);
      setActiveParticipant(activeParticipant + 1);

      console.log("from first useEffect time 2", time);
    }
    if (time === INITIALCOUNT && timerCondition === false) {
      setTimerCondition(true);
    }
  }, [time, timerCondition, activeParticipant]);

  //   useEffect(()=>{
  // if(time===0)
  //   },[timerCondition])

  //   useEffect(()=>{
  //   //   if(time===INITIALCOUNT){
  //   //   setTimerCondition(true)
  //   // }
  //   setTime(INITIALCOUNT)
  //     console.log('from second useEffect time',time)
  // //  tick()
  //   },[activeParticipant])

  //обратный отсчет ддолжен быть реализован в самом таймере, через setInterval
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

// setTimeout(()=>{

// },duration)

// if (!!timerCondition) {
//   setTimerCondition(true);
// }
// setTime(INITIALCOUNT)

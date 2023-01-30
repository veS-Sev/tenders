import React, { useState, useEffect } from "react";
import { participantsData } from "../../../constants/participants.const";
import { initialTimerDuration } from "../../../constants/initial-timer-duration.const";
import { Timer } from "../../timer/timer";
import { startTradingDate } from "../../../functions/start-trading-date.func";
// import { timerDurationSec } from "../../../constants/timer-duration-sec.const";

const timerDurationSec =
  initialTimerDuration.hour * 60 * 60 +
  initialTimerDuration.min * 60 +
  initialTimerDuration.sec;

console.log("timerDurationSec", timerDurationSec);
// timerDurationSecInMilSec - количество секунд, заданное для таймера умножено на 1000
const timerDurationSecInMilSec = timerDurationSec * 1000;

const curentActiveParticipant = (): any => {
  // timeHasPassed - разница между текущим временем и временем начала торгов
  const timeHasPassed = Number(new Date()) - startTradingDate();
  // fullCyclesOfTimer - количество таймеров, которые были завершены за время тогров округлено до тысячных
  const fullCyclesOfTimer = Number(
    (timeHasPassed / timerDurationSecInMilSec).toFixed(3)
  );
  if (participantsData.length - 1 > 0) {
    // curentActiveParticipant - челое число, указывающее на текущий таймер, т.е. 0 это первый и т.п.. Получили остаток от деления  циклов отыгранных за время торгов на количесвтво участников. Выражена в целом числе
    const curentActiveParticipant = Math.trunc(
      fullCyclesOfTimer % participantsData.length
    );

    return curentActiveParticipant;
  } else {
    return 0;
  }
};
// curentSecTimer()-Сколько осталось секунд работы таймера
const curentSecTimer = () => {
  // timeHasPassed - разница между текущим временем и временем начала торгов
  const timeHasPassed = Number(new Date()) - startTradingDate();
  // console.log("timeHasPassed", timeHasPassed);

  // SecondsOfCurrentTimerPassed -получили остаток от деления пройденного времени торгов на длительность таймера в миллисекундах
  const SecondsOfCurrentTimerPassed = Math.round(
    (timeHasPassed % timerDurationSecInMilSec) / 1000
  );
  // console.log("SecondsOfCurrentTimerPassed", SecondsOfCurrentTimerPassed);
  //  - отнимаем от длительности таймера количество пройденных секунд с начала отсчета таймера
  // const curentSecTimer=timerDurationSec-SecondsOfCurrentTimerPassed
  return timerDurationSec - SecondsOfCurrentTimerPassed;
};

console.log("curentSecTimer()", curentSecTimer());
export type TCurentTimerTime = {
  curentTimerHour: number;
  curentTimerMinutes: number;
};

export const TableHead = () => {
  const [secRemaiming, setSec] = useState(initialTimerDuration.sec);
  const [minRemaiming, setMinRemaiming] = useState(initialTimerDuration.min);
  const [hourRemaiming, setHourRemaiming] = useState(initialTimerDuration.hour);
  const [timerCondition, setTimerCondition] = useState(true);
  const [activeParticipant, setActiveParticipant] = useState(
    curentActiveParticipant()
  );

  const tick = () => {
    const timerId = setInterval(() => {
      const totalSecRemaiming = curentSecTimer();
      console.log("totalSecRemaiming", totalSecRemaiming);
      setSec(curentSecTimer() % 60);
      console.log("curentSecTimer() % 60", curentSecTimer() % 60);
      const curentMinut =
        ((totalSecRemaiming % 3600) - (totalSecRemaiming % 60)) / 60;
      console.log("secRemaiming", secRemaiming);
      console.log("curentMinut", curentMinut);
      setMinRemaiming(curentMinut);
      setHourRemaiming(Math.trunc(totalSecRemaiming / 3600));
      clearInterval(timerId);
    }, 1000);
  };
  tick();
  useEffect(() => {
    setActiveParticipant(curentActiveParticipant());
  }, [secRemaiming]);

  return (
    <thead>
      <tr>
        <th>Ход</th>
        {participantsData.map((participant: any) => (
          <th key={participant.id} data-participant={participant.id}>
            {timerCondition &&
            activeParticipant === participantsData.indexOf(participant) ? (
                <Timer
                  key={participant.id}
                  data-participant={participant.id}
                  timerCondition={timerCondition}
                  hourRemaiming={hourRemaiming}
                  minRemaiming={minRemaiming}
                  secRemaiming={secRemaiming}
                />
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

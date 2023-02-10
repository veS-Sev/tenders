import { initialTimerDuration } from "../constants/initial-timer-duration.const";
import { startTradingDate } from "./start-trading-date.func";
import { participantsData } from "../constants/participants.const";
const timerDurationSec =
  initialTimerDuration.hour * 60 * 60 +
  initialTimerDuration.min * 60 +
  initialTimerDuration.sec;

console.log("timerDurationSec", timerDurationSec);
// timerDurationSecInMilSec - количество секунд, заданное для таймера умножено на 1000
const timerDurationSecInMilSec = timerDurationSec * 1000;

export const currentActiveParticipant = ():number => {
    // timeHasPassed - разница между текущим временем и временем начала торгов
    const timeHasPassed = Number(new Date()) - startTradingDate();
    // fullCyclesOfTimer - количество таймеров, которые были завершены за время тогров округлено до тысячных
    const fullCyclesOfTimer = Number(
      (timeHasPassed / timerDurationSecInMilSec).toFixed(3)
    );
    if (participantsData.length - 1 > 0) {
      //  - челое число, указывающее на текущий таймер, т.е. 0 это первый и т.п.. Получили остаток от деления  циклов отыгранных за время торгов на количесвтво участников. Выражена в целом числе
          return Math.trunc(fullCyclesOfTimer % participantsData.length
      )
    } else {
      return 0;
    }
  };
import { startTradingDate } from "./start-trading-date.func";
import { participantsData } from "../constants/participants.const";
import {timerDurationInMilSec} from "../constants/timer-duration-sec.const"
import {delayForSwitchingTimerInMilSec} from '../constants/delay-for-switching-timer-in-mil-sec.const'

// timerDurationWithSwichDuration - количество милисекунд, заданное для таймера и для его переключения
const timerDurationWithSwichDuration = timerDurationInMilSec+Number(delayForSwitchingTimerInMilSec);

export const currentActiveParticipant = ():number => {
    // timeHasPassed - разница между текущим временем и временем начала торгов
    const timeHasPassed = Number(new Date()) - startTradingDate();
    // fullCyclesOfTimer - количество таймеров, которые были завершены за время торгов округлено до тысячных
    const fullCyclesOfTimer = Number(
      (timeHasPassed / timerDurationWithSwichDuration).toFixed(3)
    );
    if (participantsData.length - 1 > 0) {
      //  - челое число, указывающее участника для которого должен работать таймер на данный момент, т.е. 0 это первый участник и т.п.. Получили остаток от деления  циклов, отыгранных за время торгов на количесвтво участников. 
          return Math.trunc(fullCyclesOfTimer % participantsData.length
      )
    } else {
      return 0;
    }
  };
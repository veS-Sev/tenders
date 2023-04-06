import { timeHasPassed } from "./time-has-passed.func";
import { participantsData } from "../constants/participants.const";
import {timerDurationInMilSec} from "../constants/timer-duration-sec.const"
import {delayForSwitchingTimerInMilSec} from '../constants/delay-for-switching-timer-in-mil-sec.const'


// timerDurationWithSwichDuration - количество милисекунд, заданное для таймера и для его переключения
const timerDurationWithSwichDuration = timerDurationInMilSec+Number(delayForSwitchingTimerInMilSec);



export const currentActiveParticipant = (participantsData=[]):number=> {
    // timeHasPassed - разница между текущим временем и временем начала торгов
    // fullCyclesOfTimer - количество таймеров, которые были завершены за время торгов округлено до тысячных
    const fullCyclesOfTimer = Number(
      (timeHasPassed() / timerDurationWithSwichDuration).toFixed(3)
    );
    console.log('participantsData', participantsData )
    if (participantsData.length - 1 > 0) {
      //  - челое число, указывающее участника для которого должен работать таймер на данный момент, т.е. 0 это первый участник и т.п.. Получили остаток от деления  циклов, отыгранных за время торгов на количесвтво участников. 
      console.log('participantsData.length', participantsData.length )
      console.log('Math.trunc(fullCyclesOfTimer % participantsData.length',Math.trunc(fullCyclesOfTimer % participantsData.length))
          return Math.trunc(fullCyclesOfTimer % participantsData.length
      )
    } else {
      return 0;
    }
  };


import { timeHasPassed } from "./time-has-passed.func";
import {timerDurationInMilSec} from "../components/timer/constants/timer-duration-sec.const"
import {delayForSwitchingTimerInMilSec} from '../components/timer/constants/delay-for-switching-timer-in-mil-sec.const'
import {TStartOfTender} from '../features/tenders/types'


// timerDurationWithSwichDuration - количество милисекунд, заданное для таймера и для его переключения
const timerDurationWithSwichDuration = timerDurationInMilSec+Number(delayForSwitchingTimerInMilSec);



export const activeParticipantByIndex = (participantsData:any,startOfTender: TStartOfTender):number=> {
    // timeHasPassed - разница между текущим временем и временем начала торгов
    // fullCyclesOfTimer - количество таймеров, которые были завершены за время торгов округлено до тысячных
    const fullCyclesOfTimer = Number(
      (timeHasPassed(startOfTender) / timerDurationWithSwichDuration).toFixed(3)
    );
    
    if (participantsData.length - 1 > 0) {
      //  - челое число, указывающее участника для которого должен работать таймер на данный момент, т.е. 0 это первый участник и т.п. Получили остаток от деления  циклов, отыгранных за время торгов на количество участников. 
          return Math.trunc(fullCyclesOfTimer % participantsData.length
      )
    } else {
      return 0;
    }
  };



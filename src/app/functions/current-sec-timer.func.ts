import { timeHasPassed } from "./time-has-passed.func";
import { timerDurationInMilSec } from "../constants/timer-duration-sec.const";
import { delayForSwitchingTimerInMilSec } from "../constants/delay-for-switching-timer-in-mil-sec.const";
import {TStartOfTrading} from '../features/tradings/types'

export const currentSecTimer = (startOfTrading: TStartOfTrading) => {
  // timerDurationSecInMilSec - количество секунд, заданное для таймера умножено на 1000
  const timerDurationWithSwichDuration =
    timerDurationInMilSec + Number(delayForSwitchingTimerInMilSec);
  // timeHasPassed - разница между текущим временем и временем начала торгов
   // SecondsOfCurrentTimerPassed -получили остаток от деления пройденного времени торгов на длительность таймера и времени на переключение в миллисекундах
  const SecondsOfCurrentTimerPassed =
    timeHasPassed(startOfTrading) % timerDurationWithSwichDuration;
  //  - отнимаем от длительности таймера количество пройденных секунд с начала отсчета таймера
  return Math.trunc(
    (timerDurationWithSwichDuration - SecondsOfCurrentTimerPassed) / 1000
  );
};

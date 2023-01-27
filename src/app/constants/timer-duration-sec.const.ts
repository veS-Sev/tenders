import{initialTimerDuration} from '../constants/initial-timer-duration.const'


export const timerDurationSec = initialTimerDuration.hour * 60 * 60 + initialTimerDuration.min + initialTimerDuration.sec;
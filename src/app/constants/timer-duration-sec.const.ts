import { initialTimerDuration } from "./initial-timer-duration.const";

export const timerDurationInMilSec =(
  initialTimerDuration.hour * 60 * 60 +
  initialTimerDuration.min*60 +
  initialTimerDuration.sec)*1000;

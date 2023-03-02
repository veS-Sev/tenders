import { initialTimerDuration } from "./initial-timer-duration.const";

export const timerDurationInMilSec =(
  initialTimerDuration.hour * 60 * 60 +
  initialTimerDuration.min +
  initialTimerDuration.sec)*1000;

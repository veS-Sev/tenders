import { startTradingDate } from "./start-trading-date.func";
import {TStartOfTrading} from '../features/tradings/types'

// Узнаем сколько времени прошло с начала торгов в миллисекундах, если timeHasPassed < 0, то торги не начались
export const timeHasPassed = (startOfTrading: TStartOfTrading) => {
    return Number(new Date())
    - startTradingDate(startOfTrading)
};



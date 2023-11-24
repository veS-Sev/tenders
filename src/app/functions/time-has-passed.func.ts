import { startTenderDate } from "./start-tender-date.func";
import {TStartOfTender} from '../features/tenders/types'

// Узнаем сколько времени прошло с начала торгов в миллисекундах, если timeHasPassed < 0, то торги не начались
export const timeHasPassed = (startOfTender: TStartOfTender) => {
    return Number(new Date())
    - startTenderDate(startOfTender)
};



import { TStartOfTender} from "../features/tenders/types";

//переводим дату начала в миллисекунды
export const startTenderDate = (startOfTender: TStartOfTender)=>{
    let { year, month, day, hour, min } = startOfTender;
    return Number(
      new Date(
        year,
        (month-1),
        day,
        hour,
        min
      )
    );
  };

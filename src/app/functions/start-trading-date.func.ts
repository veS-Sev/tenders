import { TStartOfTrading} from "../features/tradings/types";

//переводим дату начала в миллисекунды
export const startTradingDate = (startOfTrading: TStartOfTrading)=>{
    let { year, month, day, hour, min } = startOfTrading;
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

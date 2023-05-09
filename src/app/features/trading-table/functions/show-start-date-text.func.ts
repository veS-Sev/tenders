import { TStartOfTradingData} from "../../tradings/types";

export const showStartDateText = (startOfTrading: TStartOfTradingData): string => {
    let { month, day, hour, min } = startOfTrading;
    const dateInFormat = Object.fromEntries(
      // преобразоваем в массив, затем map, затем fromEntries обратно в объект
      Object.entries({ month, day, hour, min }).map(([key, value]) => [
        key,
        String(value).padStart(2, "0"),
      ])
    );
    return ` Начало ${dateInFormat.day}.${dateInFormat.month}.${startOfTrading.year} в ${dateInFormat.hour}:${dateInFormat.min}`;
  };

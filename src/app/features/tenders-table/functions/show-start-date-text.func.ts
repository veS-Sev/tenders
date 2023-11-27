import { TStartOfTenderData} from "../types";

export const showStartDateText = (startOfTender: TStartOfTenderData): string => {
    let { month, day, hour, min } = startOfTender;
    const dateInFormat = Object.fromEntries(
      // преобразоваем в массив, затем map, затем fromEntries обратно в объект
      Object.entries({ month, day, hour, min }).map(([key, value]) => [
        key,
        String(value).padStart(2, "0"),
      ])
    );
    return ` Начало ${dateInFormat.day}.${dateInFormat.month}.${startOfTender.year} в ${dateInFormat.hour}:${dateInFormat.min}`;
  };

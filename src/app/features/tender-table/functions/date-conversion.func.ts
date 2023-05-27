import { TStartOfTenderData} from "../../tenders/types/start-of-tender.type";
export   const dateConversion = (startOfTender: TStartOfTenderData): any => {
  let { year, month, day, hour, min } = startOfTender;
  const dateStartError = new Error("Дата начала торгов неверна");
  const numYear = Number(year);
  const numMonth = Number(month);
  const numDay = Number(day);
  const numHour = Number(hour);
  const numMin = Number(min);
  try {
    for (const [key, value] of Object.entries(startOfTender)) {
       if (
        Boolean(value) === false ||
        Boolean(Number.isNaN(Math.trunc(Number(value)))) === true
      ) {
        throw dateStartError;
      }
    }
    if (
      numYear > 2023 + 10 ||
      numYear < 2023 ||
      numMonth > 12 ||
      1 > numMonth ||
      numDay > 31 ||
      numDay < 0 ||
      numHour > 23 ||
      0 > numHour ||
      numMin > 59 ||
      0 > numMin ||
      (numMonth === 2 && numDay > 29) ||
      (numYear % 4 === 0 && numMonth === 2 && numDay > 28)
    ) {
      throw dateStartError;
    } else {
      year = numYear;
      month = numMonth;
      day = numDay;
      hour = numHour;
      min = numMin;
      return { year, month, day, hour, min };
    }
  } catch (err) {
    console.log(err);
  }
};


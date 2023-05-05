import "./table-container.scss";
import { useState, useEffect } from "react";
import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
import { useAppSelector } from "../../hooks";
import { selectTradingById } from "../tradings/slices/tradings-data.slice";
import { dateConversion } from "../../features/tradings/functions/date-conversion.func";
import { TStartOfTradingData} from "../tradings/types";
import { timeHasPassed } from "../../functions/index";

export const TableContainer = () => {
  const [auctionStarted, setAuctionStarted] = useState(false);
  const activeTradingSelector = useAppSelector(
    (state) => state.activeTrading.activeTrading
  );
  const tradingData = useAppSelector((state) =>
    selectTradingById(state, activeTradingSelector)
  );
  const startOfTradingData: TStartOfTradingData = tradingData.startOfTrading;
  const startOfTrading = dateConversion(startOfTradingData);

  useEffect(() => {
    if (startOfTrading) {
      if (timeHasPassed(startOfTrading) > 0) {
        setAuctionStarted(true);
      }
      if (timeHasPassed(startOfTrading) <= 0) {
        setAuctionStarted(false);
      }
    }
  }, [tradingData]);

  const showStartDate = (startOfTrading: TStartOfTradingData): string => {
    let { month, day, hour, min } = startOfTrading;
    const dateInFormat = Object.fromEntries(
      // преобразоваем в массив, затем map, затем fromEntries обратно в объект
      Object.entries({ month, day, hour, min }).map(([key, value]) => [
        key,
        String(value).padStart(2, "0"),
      ])
    );
    return `Начало ${dateInFormat.day}.${dateInFormat.month}.${startOfTrading.year} в ${dateInFormat.hour}:${dateInFormat.min}`;
  };

  return (
    <>
      <h1 className="traiding-table-name">
        Ход торгов:
        <span>
          Тестовые торги на
          {tradingData.tradingName}.
        </span>
        {showStartDate(startOfTrading)}
      </h1>
      {auctionStarted ? (
        <>
          <div className="traiding-table-notice">
            Уважаемые участники, во время ходы вы можете изменить параметры
            торгов, указанных в таблице:
          </div>
          <table className="table-table">
            <TableHead trading={tradingData} />
            <TableBody trading={tradingData} />
          </table>
        </>
      ) : (
        <div>Торги еще не начались</div>
      )}
    </>
  );
};

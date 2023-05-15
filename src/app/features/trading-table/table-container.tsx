import "./table-container.scss";
import { useState, useEffect } from "react";
import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
import { useAppSelector } from "../../hooks";
import { selectTradingById } from "../tradings/slices/tradings-data.slice";
import { dateConversion } from "../../features/tradings/functions/date-conversion.func";
import { TStartOfTradingData, TTradingParticipant } from "../tradings/types";
import { timeHasPassed } from "../../functions/index";
import {showStartDateText} from './functions/show-start-date-text.func'

export const TableContainer = () => {
  const [dateReached, setDateReached] = useState(false);
  const activeTradingSelector = useAppSelector(
    (state) => state.activeTrading.activeTrading
  );
  const tradingData = useAppSelector((state) =>
    selectTradingById(state, activeTradingSelector)
  );
  const startOfTradingData: TStartOfTradingData = tradingData.startOfTrading;
  const startOfTrading = dateConversion(startOfTradingData);
  const tradingParticipants: TTradingParticipant[] =
    tradingData.tradingParticipants;
  useEffect(() => {
    if (startOfTrading) {
      if (timeHasPassed(startOfTrading) > 0) {
        setDateReached(true);
      }
      if (timeHasPassed(startOfTrading) <= 0) {
        setDateReached(false);
      }
    }
  }, [tradingData,tradingParticipants]);
  return (
    <>
      <h1 className="traiding-table-name">
        Ход торгов:
        <span>
          Тестовые торги на
          {tradingData.tradingName}. 
        </span>
        {showStartDateText(startOfTrading)}
      </h1>
    
      { !dateReached?<div>Торги еще не начались</div>:(!tradingParticipants?<div>Нет участников</div>:
      (<>
             <div className="traiding-table-notice">
               Уважаемые участники, во время ходы вы можете изменить параметры
               торгов, указанных в таблице:
             </div>
             <table className="traiding-table">
               <TableHead 
               trading={tradingData} 
               />
               <TableBody trading={tradingData} />
             </table>
           </>
        ))
      }
    </>
  );
};


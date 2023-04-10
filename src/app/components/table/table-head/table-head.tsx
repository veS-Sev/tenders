import { useState, useEffect } from "react";
import "./table-head.scss";
import { Timer } from "../../timer/timer";
import { timeHasPassed } from "../../../functions/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/roote-state.type";
import { chooseVisibleTrading } from "../../../store/slices/trading.slice";
import { useFetchService } from "../../../pages/traiding-page/hooks/useFetchService.hook";
import { tradingParametr } from "../../../functions/index";

export const TableHead = () => {
  const tradingData: any = useFetchService("http://localhost:3001/tradings");
  const activeParticipant = useSelector(
    (state: RootState) => state.activeParticipant.activeParticipant
  );

  const activeTradingSelector = useSelector(chooseVisibleTrading);
  const [auctionStarted, setAuctionStarted] = useState(false);
  // const tradingParticipantsList=tradingParametr(tradingData,selector.payload.activeTrading.activeTrading,"tradingParticipants")
  const tradingParticipants = () => {
    if (tradingData) {
      return tradingData.find(
        (x: any) => x.tradingId === activeTradingSelector.payload.activeTrading.activeTrading
      )["tradingParticipants"];
    } else {
      return [];
    }
  };
  // tradingData&&tradingData.filter((x: any) => x.tradingId === tradingId)![parametr];
  useEffect(() => {
    if (timeHasPassed() > 0) {
      setAuctionStarted(true);
    }
  }, []);
// console.log('activeParticipant',activeParticipant)
  return (
    <thead className="table-head">
      <tr>
        <th className="tablehead-th">Ход</th>
        {tradingParticipants().map((participant: string) => (      
          <th key={participant} data-participant={participant}>
            {auctionStarted &&
            activeParticipant === tradingParticipants().indexOf(participant) ? (
              <Timer
                key={participant}
                data-participant={participant}
        
              />
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

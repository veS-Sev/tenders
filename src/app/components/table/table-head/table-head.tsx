import { useState, useEffect } from "react";
import "./table-head.scss";
import { Timer } from "../../timer/timer";
import { timeHasPassed } from "../../../functions/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/roote-state.type";
import { chooseСurrentVisibleTrading } from "../../../features/tradings/slices/tradings.slice";
import { useFetchService } from "../../../pages/traiding-page/hooks/useFetchService.hook";


export const TableHead = () => {
  const tradingData: any = useFetchService("http://localhost:3001/tradings");
  const activeParticipant = useSelector(
    (state: RootState) => state.activeParticipant.activeParticipant
  );
  const activeTradingSelector = useSelector(chooseСurrentVisibleTrading);
  const [auctionStarted, setAuctionStarted] = useState(false);

  const tradingParticipants = () => {
    if (tradingData) {
      return tradingData.find(
        (x: any) => x.tradingId === activeTradingSelector.payload.activeTrading.activeTrading
      )["tradingParticipants"];
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (timeHasPassed() > 0) {
      setAuctionStarted(true);
    }
  }, []);

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

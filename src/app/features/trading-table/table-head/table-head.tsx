import { useState, useEffect } from "react";
import "./table-head.scss";
import { Timer } from "../../../components/timer/timer";
import { timeHasPassed } from "../../../functions/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/roote-state.type";
import { chooseСurrentVisibleTrading } from "../../../features/tradings/slices/tradings.slice";
import { useFetchService } from "../../../pages/traiding-page/hooks/useFetchService.hook";
import {TTradingData, TTradingParticipant } from "../../tradings/types";


export const TableHead = () => {
  const tradingsData: any = useFetchService("http://localhost:3001/tradings");
  const activeParticipant = useSelector(
    (state: RootState) => state.activeParticipant.activeParticipant
  );
  const activeTradingSelector = useSelector(chooseСurrentVisibleTrading);
  const [auctionStarted, setAuctionStarted] = useState(false);

  const tradingParticipants = () => {
    if(tradingsData===null){return []}
    else{
      return tradingsData.find(
        (x:TTradingData) => x.tradingId === activeTradingSelector.payload.activeTrading.activeTrading
      )["tradingParticipants"];
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
        {tradingParticipants().map((participant:TTradingParticipant) => (      
          <th key={participant.id} data-participant={participant}>
            {auctionStarted &&
            activeParticipant === tradingParticipants().indexOf(participant) ? (
              <Timer
                key={participant.id}
                data-participant={participant}
        
              />
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

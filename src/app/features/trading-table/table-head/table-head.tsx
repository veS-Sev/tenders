import { useState, useEffect } from "react";
import "./table-head.scss";
import { Timer } from "../../../components/timer/timer";
import { timeHasPassed } from "../../../functions/index";
import { useAppSelector } from "../../../hooks";
import { TTradingParticipant } from "../../tradings/types";
import { TTradingTableProp } from "../types";

export const TableHead = ({ trading }: TTradingTableProp) => {
  const activeParticipant = useAppSelector(
    (state) => state.activeParticipant.activeParticipant
  );
  const [auctionStarted, setAuctionStarted] = useState(false);
  const tradingParticipants = trading["tradingParticipants"];

  useEffect(() => {
    if (timeHasPassed() > 0) {
      setAuctionStarted(true);
    }
  }, []);
  return (
    <thead className="table-head">
      <tr>
        <th className="tablehead-th">Ход</th>
        {tradingParticipants.map((participant: TTradingParticipant) => (
          <th key={participant.id} data-participant={participant.id}>
            {auctionStarted &&
            activeParticipant === tradingParticipants.indexOf(participant) ? (
              <Timer key={participant.id} data-participant={participant} />
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

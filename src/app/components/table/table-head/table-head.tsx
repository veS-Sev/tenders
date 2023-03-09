import { useState, useEffect } from "react";
import "./table-head.scss";
import { participantsData } from "../../../constants/participants.const";
import { Timer } from "../../timer/timer";
import { timeHasPassed} from "../../../functions/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/roote-state.type";

export const TableHead = () => {
  const activeParticipant=useSelector((state:RootState)=>state.activeParticipant.activeParticipant)
  const [auctionStarted, setAuctionStarted] = useState(false);

  useEffect(() => {
    if (timeHasPassed() > 0) {
      setAuctionStarted(true);
    }
  }, []);
  return (
    <thead className="table-head">
      <tr>
        <th className="tablehead-th">Ход</th>
        {participantsData.map((participant: any) => (
          <th key={participant.id} data-participant={participant.id}>
            {auctionStarted &&
            activeParticipant === participantsData.indexOf(participant) ? (
              <Timer
                key={participant.id}
                data-participant={participant.id}
        
              />
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

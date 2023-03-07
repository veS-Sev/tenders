import { useState, useEffect } from "react";
import "./table-head.scss";
import { participantsData } from "../../../constants/participants.const";
import { initialTimerDuration } from "../../../constants/initial-timer-duration.const";
import { Timer } from "../../timer/timer";
import { currentActiveParticipant, timeHasPassed} from "../../../functions/index";

import { useDispatch, useSelector } from "react-redux";
import { TTableHead } from "./types/index";
import { store } from "../../../store";

export const TableHead = () => {
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [activeParticipant, setActiveParticipant] = useState(
    currentActiveParticipant()
  );

  useEffect(() => {
    if (timeHasPassed() > 0) {
      setAuctionStarted(true);
    }
  }, []);
  const changeActiveParticipant = (timerWorkCondition: boolean) => {
    if (!timerWorkCondition) {
      setActiveParticipant(currentActiveParticipant());
    }
  };
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
                activeParticipantTimer={changeActiveParticipant}
              />
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

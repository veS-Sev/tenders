import "./table-head.scss";
import { useEffect } from "react";
import { Timer } from "../../../components/timer/timer";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { TTradingParticipant } from "../../tradings/types";
import { TTradingTableProp } from "../types";
import { dateConversion } from "../../tradings/functions/date-conversion.func";
import { activeParticipantByIndex } from "../../../functions";
import { changeActiveParticipant } from "../../participants/slices/active-timer-participant.slice";

export const TableHead = ({ trading }: TTradingTableProp) => {
  const activeTimerParticipant = useAppSelector(
    (state) => state.activeTimerParticipant.id
  );
  const dispatch = useAppDispatch();

  const startOfTrading = dateConversion(trading.startOfTrading);

  const tradingParticipants = trading["tradingParticipants"];

  const idOfActiveParticipant = () => {
    const idexOfParticipant = activeParticipantByIndex(
      tradingParticipants,
      startOfTrading
    );
    return tradingParticipants[idexOfParticipant].id;
  };

  useEffect(() => {
    dispatch(changeActiveParticipant(idOfActiveParticipant()));
  }, []);
  return (
    <thead className="table-head">
      <tr>
        <th className="tablehead-th">Ход</th>
        {tradingParticipants.map((participant: TTradingParticipant) => (
          <th key={participant.id} data-participant={participant.id}>
            {
            participant.id===activeTimerParticipant
            ? (
              <Timer key={participant.id} data-participant={participant} />
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

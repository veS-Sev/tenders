import "./table-head.scss";
import { useCallback, useEffect } from "react";
import { Timer } from "../../../components/timer/timer";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { TTenderParticipant } from "../../tenders/types";
import { dateConversion } from "../functions/date-conversion.func";
import { activeParticipantByIndex } from "../../../functions";
import { changeActiveParticipant } from "../store/active-timer-participant.slice";

export const TableHead = () => {
  const activeTimerParticipant = useAppSelector(
    (state) => state.activeTimerParticipant.id
  );

  const dispatch = useAppDispatch();
  const tender: any = useAppSelector((state) => state.tenderTable.tenderData);
  const startOfTender = dateConversion(tender.startOfTender);
  const tenderParticipants = tender.tenderParticipants;

  const idOfActiveParticipant = useCallback(() => {
    const idexOfParticipant = activeParticipantByIndex(
      tenderParticipants,
      startOfTender
    );

    return tenderParticipants[idexOfParticipant].id;
  }, [tenderParticipants, startOfTender]);
  useEffect(() => {
    dispatch(changeActiveParticipant(idOfActiveParticipant()));
  }, [tenderParticipants,dispatch,idOfActiveParticipant]);

  return (
    <thead className="table-head">
      <tr>
        <th className="tablehead-th">Ход</th>
        {tenderParticipants.map((participant: TTenderParticipant) => (
          <th key={participant.id} data-participant={participant.id}>
            {participant.id === activeTimerParticipant ? (
              <Timer key={participant.id} data-participant={participant} />
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

import "./table-head.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetTenderQuery } from "../api/tender.api";
import { Timer } from "../../../components/timer/timer";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { TTenderParticipant } from "../../tenders/types";
import { dateConversion } from "../functions/date-conversion.func";
import { activeParticipantByIndex } from "../../../functions";
import { changeActiveParticipant } from "../store/active-timer-participant.slice";

type TTableHead={
  actualOffers: TTenderParticipant[]
}

export const TableHead = ({actualOffers}:TTableHead) => {
  const activeTimerParticipant = useAppSelector(
    (state) => state.activeTimerParticipant.id
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data, isSuccess } = useGetTenderQuery(id);
  const startOfTender = isSuccess && dateConversion(data.startOfTender);
  
const idOfActiveParticipant = () => {
    const index = activeParticipantByIndex(actualOffers, startOfTender);
   return actualOffers[index].participantId;
  };
  useEffect(() => {
    if(isSuccess&&actualOffers){
    dispatch(changeActiveParticipant(idOfActiveParticipant()));
}}, [actualOffers, dispatch, idOfActiveParticipant,isSuccess]);

  return (<>
    <thead className="table-head">
      <tr>
        <th className="tablehead-th">Ход</th>
        {actualOffers &&
          actualOffers.map((participant: TTenderParticipant) => (
            <th key={participant.id}>
              {participant.participantId === activeTimerParticipant ? (
                <Timer actualOffers={actualOffers}key={participant.id} />
              ) : null}
            </th>
          ))}
      </tr>
    </thead>
    </>
  );
};


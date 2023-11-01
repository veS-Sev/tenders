import "./table-head.scss";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetTenderQuery } from "../api/tender.api";
import { Timer } from "../../../components/timer/timer";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { TTenderParticipant } from "../../tenders/types";
import { dateConversion } from "../functions/date-conversion.func";
import { activeParticipantByIndex } from "../../../functions";
import { changeActiveParticipant } from "../store/active-timer-participant.slice";
import {
  useTendersParticipantsList,
  useActualParticipantOffersForTender,
} from "../hooks";
export const TableHead = () => {
  const activeTimerParticipant = useAppSelector(
    (state) => state.activeTimerParticipant.id
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const tenderId: string|undefined = useAppSelector(
    (state) => state.activeTender.activeTender
  );
  const participantsList: any[] = useTendersParticipantsList(id);

  console.log('tenderId TH',tenderId)


  const { data, isSuccess } = useGetTenderQuery(tenderId);
console.log('data, isSuccess TH',data, isSuccess)
const actualOffers = useActualParticipantOffersForTender( participantsList);
console.log('actualOffers TH',actualOffers)
  const startOfTender = isSuccess && dateConversion(data.startOfTender);
  const tenderParticipants = isSuccess && actualOffers;
console.log('tenderParticipants TH',tenderParticipants)
  
const idOfActiveParticipant = ():string => {
    const index = activeParticipantByIndex(actualOffers, startOfTender);
   return isSuccess && actualOffers[index].participantId;
  };
  useEffect(() => {

    dispatch(changeActiveParticipant(idOfActiveParticipant()));
  }, [tenderParticipants, dispatch, idOfActiveParticipant]);

  return (
    <thead className="table-head">
      <tr>
        <th className="tablehead-th">Ход</th>
        {actualOffers &&
          actualOffers.map((participant: TTenderParticipant) => (
            <th key={participant.id}>
              {participant.participantId === activeTimerParticipant ? (
                <Timer key={participant.id} />
              ) : null}
            </th>
          ))}
      </tr>
    </thead>
  );
};
//  const idOfActiveParticipant = useCallback(() => {
//     const idexOfParticipant = activeParticipantByIndex(
//       tenderParticipants,
//       startOfTender
//     );

//     return tenderParticipants[idexOfParticipant].id;
//   }, [tenderParticipants, startOfTender]);

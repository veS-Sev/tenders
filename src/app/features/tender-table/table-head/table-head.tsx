import "./table-head.scss";
import { useCallback, useEffect } from "react";
import { useGetTenderQuery } from "../api/tender.api";
import { Timer } from "../../../components/timer/timer";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { TTenderParticipant } from "../../tenders/types";
import { dateConversion } from "../functions/date-conversion.func";
import { activeParticipantByIndex } from "../../../functions";
import { changeActiveParticipant } from "../store/active-timer-participant.slice";
// import {selectTenderById} from "../store/tender.api"
export const TableHead = () => {
  const activeTimerParticipant = useAppSelector(
    (state) => state.activeTimerParticipant.id
  );

  const dispatch = useAppDispatch();

  const tenderId: any = useAppSelector(
    (state) => state.activeTender.activeTender
  );
  const tender: any = useAppSelector((state) => state.tenderApi.queries.get);
  const { data, isSuccess } = useGetTenderQuery(tenderId);
  // const tender: any = useAppSelector((state)=>selectTenderById(state,tenderId)) ;
  const startOfTender = isSuccess&&dateConversion(data.startOfTender);
  const tenderParticipants = isSuccess&&data.tenderParticipants;

    const idOfActiveParticipant =():number=>{
      const index= activeParticipantByIndex(
      tenderParticipants,
      startOfTender
    );
    return  isSuccess&&tenderParticipants[index].id;
    }
   
 
  

  useEffect(() => {
    dispatch(changeActiveParticipant(idOfActiveParticipant()));
  }, [tenderParticipants,dispatch,idOfActiveParticipant]);

  console.log("tenderParticipants", tenderParticipants);
  return (
    <thead className="table-head">
      <tr>
        <th className="tablehead-th">Ход</th>
        {tenderParticipants &&
          tenderParticipants.map((participant: TTenderParticipant) => (
            <th key={participant.id}>
              {participant.id === activeTimerParticipant ? (
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
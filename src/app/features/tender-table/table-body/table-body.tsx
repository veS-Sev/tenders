import "./table-body.scss";
import {useAppSelector} from '../../../hooks'
import {
  TTenderParameters,
} from "../../../features/tenders/types/index";
import {TTenderTableProp} from "../types";

export const TableBody = (
  {tender}:TTenderTableProp) => {
  const activeTimerParticipant = useAppSelector(
    (state) => state.activeTimerParticipant.id
  );

  const tenderParticipants = tender.tenderParticipants;

  return (
    <>
    <tbody>
      {Object.getOwnPropertyNames(tender.tenderParamerts).map((parametr: string) => (
        <tr key={parametr}>
          <th key={parametr}>
            {tender.tenderParamerts[parametr as keyof TTenderParameters]}
          </th>
          {tenderParticipants.map(
              //должен быть установлен тип
              (participant:any) => (
                <td
                  className={
                    activeTimerParticipant ===
                    (participant.id)
                      ? "active participant-column"
                      : "participant-column"
                  }
                  key={participant.id}
                >
                  {participant[parametr as keyof TTenderParameters]}
                </td>
              )
            )}
        </tr>
      ))}
    </tbody></>
  );
};


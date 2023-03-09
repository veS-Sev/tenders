import "./table-body.scss";
import { TTradingParameters } from "../../../constants/types";
import { tradingParameters } from "../../../constants/trading-parameters.const";
import { participantsData } from "../../../constants/participants.const";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/roote-state.type";


export const TableBody = () => {
  const activeParticipant = useSelector(
    (state: RootState) => state.activeParticipant.activeParticipant
  );

  return (
    <tbody>
      {Object.getOwnPropertyNames(tradingParameters).map((parametr: string) => (
        <tr key={tradingParameters + parametr}>
          <th key={parametr}>
            {tradingParameters[parametr as keyof TTradingParameters]}
          </th>
          {participantsData.map((participant) => (
            <td
              className={
                activeParticipant === participantsData.indexOf(participant)
                  ? "active participant-column"
                  : "participant-column"
              }
              key={participant.id}
            >
              {participant[parametr as keyof TTradingParameters]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

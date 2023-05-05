import "./table-body.scss";
import {useAppSelector} from '../../../hooks'
import {
  TTradingParameters,
  TTradingData,
  TTradingParticipant,
} from "../../../features/tradings/types/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/roote-state.type";
import {TTradingTableProp} from "../types";

export const TableBody = ({trading}:TTradingTableProp) => {
  // const activeTimerParticipant = useAppSelector(
  //   (state: RootState) => state.activeTimerParticipant.id
  // );

  const tradingParticipants = trading["tradingParticipants"];
  return (
    <tbody>
      {Object.getOwnPropertyNames(trading.tradingParamerts).map((parametr: string) => (
        <tr key={parametr}>
          <th key={parametr}>
            {trading.tradingParamerts[parametr as keyof TTradingParameters]}
          </th>
          {tradingParticipants.map(
              //должен быть установлен тип
              (participant:any) => (
                <td
                  // className={
                  //   activeParticipant ===
                  //   tradingParticipants.indexOf(participant)
                  //     ? "active participant-column"
                  //     : "participant-column"
                  // }
                  key={participant.id}
                >
                  {participant[parametr as keyof TTradingParameters]}
                </td>
              )
            )}
        </tr>
      ))}
    </tbody>
  );
};
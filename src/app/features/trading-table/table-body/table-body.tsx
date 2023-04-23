import "./table-body.scss";
import { TParticipant } from "../../../constants/types/index";
import {
  TTradingParameters,
  TTradingData,
  TTradingParticipant,
} from "../../../features/tradings/types/index";
import { tradingParameters } from "../../../constants/trading-parameters.const";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/roote-state.type";
import { chooseСurrentVisibleTrading } from "../../../features/tradings/slices/tradings.slice";
import { useFetchService } from "../../../pages/traiding-page/hooks/useFetchService.hook";

export const TableBody = () => {
  const tradingsData: TTradingData[] = useFetchService(
    "http://localhost:3001/tradings"
  );
  const activeParticipant = useSelector(
    (state: RootState) => state.activeParticipant.activeParticipant
  );
  const activeTradingSelector = useSelector(chooseСurrentVisibleTrading);


  const actualTradingParticipants = () => {
    if (tradingsData === null) {
      return [];
    } else {
      const selectTrading = tradingsData.find(
        (x: TTradingData) =>
          x.tradingId ===
          activeTradingSelector.payload.activeTrading.activeTrading
      );
      if (selectTrading === undefined) {
        return [];
      } else {
        return selectTrading.tradingParticipants;
      }
    }
  };


  return (
    <tbody>
      {Object.getOwnPropertyNames(tradingParameters).map((parametr: string) => (
        <tr key={tradingParameters + parametr}>
          <th key={parametr}>
            {tradingParameters[parametr as keyof TTradingParameters]}
          </th>
          {actualTradingParticipants &&
            actualTradingParticipants().map(
              //any должен быть заменен на TParticipant
              (participant: any) => (
                <td
                  className={
                    activeParticipant ===
                    actualTradingParticipants().indexOf(participant)
                      ? "active participant-column"
                      : "participant-column"
                  }
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

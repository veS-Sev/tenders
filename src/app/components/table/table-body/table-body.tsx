import "./table-body.scss";
import { TTradingParameters } from "../../../constants/types";
import { tradingParameters } from "../../../constants/trading-parameters.const";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/roote-state.type";
import { chooseVisibleTrading } from "../../../store/slices/trading.slice";
import { useFetchService } from "../../../pages/traiding-page/hooks/useFetchService.hook";

export const TableBody = () => {
  const tradingData: any = useFetchService("http://localhost:3001/tradings");
  const someParticipantsData: any = useFetchService("http://localhost:3001/participants");
   
  const activeParticipant = useSelector(
    (state: RootState) => state.activeParticipant.activeParticipant
  );
  const activeTradingSelector = useSelector(chooseVisibleTrading);
  const tradingParticipants = () => {
    if (tradingData) {
      return tradingData.find(
        (x: any) => x.tradingId === activeTradingSelector.payload.activeTrading.activeTrading
      )["tradingParticipants"];
    } else {
      return [];
    }
  };
  const actualTradingParticipants=tradingParticipants().map((item:string)=>{
  if(someParticipantsData){
  return  someParticipantsData.find((participant:any)=>item===participant.id)
  }}
  )
  
  return (
    <tbody>
      {Object.getOwnPropertyNames(tradingParameters).map((parametr: string) => (
        <tr key={tradingParameters + parametr}>
          <th key={parametr}>
            {tradingParameters[parametr as keyof TTradingParameters]}
          </th>
          {actualTradingParticipants.map((participant:any) => (
            <td
              className={
                activeParticipant === actualTradingParticipants.indexOf(participant)
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

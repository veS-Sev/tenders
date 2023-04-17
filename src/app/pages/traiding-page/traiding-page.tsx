import "../traiding-page/traiding-page.scss";
import { TradingNavbar } from "../../features/tradings/trading-navbar/trading-navbar";
import { TableContainer } from "../../components/table/table-container";
import { useFetchService } from "../../pages/traiding-page/hooks/useFetchService.hook";
import { useDispatch, useSelector } from "react-redux";
import { chooseСurrentVisibleTrading } from "../../features/tradings/slices/tradings.slice";
import { tradingParametr } from "../../functions/index";
import{changeParticipant} from"../../features/participants/slices/participants.slice";

export const TraidingPage = () => {
  const tradingData: any = useFetchService("http://localhost:3001/tradings");
  const activeTradingSelector = useSelector(chooseСurrentVisibleTrading);
const dispatchChangeParticipantsList=useDispatch()

  return (
    <>
      <TradingNavbar />
      <div>
        <h1 className="traiding-name">
          Ход торгов:
          <span>
            Тестовые торги на
            {tradingData &&
              ` ${tradingParametr(
                tradingData,
                activeTradingSelector.payload.activeTrading.activeTrading,
                "tradingName"
              )}`}
            (Дата, время. Текущие?)
          </span>
        </h1>
        <div className="traiding-notice">
          Уважаемые участники, во время ходы вы можете изменить параметры
          торгов, указанных в таблице:
        </div>
        <TableContainer />
      </div>
    </>
  );
};

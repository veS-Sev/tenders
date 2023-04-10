import "../traiding-page/traiding-page.scss";
import { TradingNavbar } from "../../features/trading-navbar/trading-navbar";
import { TableContainer } from "../../components/table/table-container";
import { useFetchService } from "../../pages/traiding-page/hooks/useFetchService.hook";
import { useSelector } from "react-redux";
import { chooseVisibleTrading } from "../../store/slices/trading.slice";
import { tradingParametr } from "../../functions/index";

export const TraidingPage = () => {
  const tradingData: any = useFetchService("http://localhost:3001/tradings");
  const activeTradingSelector = useSelector(chooseVisibleTrading);

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

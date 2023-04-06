import "../traiding-page/traiding-page.scss";
import { TableContainer } from "../../components/table/table-container";
import { useFetchService } from "../../pages/traiding-page/hooks/useFetchService.hook";
import { useDispatch, useSelector } from "react-redux";
import { chooseVisibleTrading } from "../../store/slices/trading.slice";
import { tradingParametr } from "../../functions/index";

export const TraidingPage = () => {
  const tradingData: any = useFetchService("http://localhost:3001/tradings");
  console.log('tradingData',tradingData)
  const dispatch = useDispatch();
  const activeTradingSelector = useSelector(chooseVisibleTrading);

  tradingData&&console.log('tradingParticipants',
    tradingParametr(
      tradingData,
      activeTradingSelector.payload.activeTrading.activeTrading,
      "tradingParticipants"
    )
  );
  return (
    // здесь должна быть секция торгов
    <>
      <section className="traiding-grid">
        {tradingData &&
          tradingData.map((trading: any) => (
            <button
              onClick={() => dispatch(chooseVisibleTrading(trading.tradingId))}
              className="trading-grid"
              key={trading.tradingId + trading.tradingName}
            >
              {trading.tradingName}
            </button>
          ))}
      </section>
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

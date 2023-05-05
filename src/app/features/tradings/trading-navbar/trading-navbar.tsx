import { chooseСurrentVisibleTrading } from "../slices/tradings.slice";
import { TTradingData } from "../types/index";
import { useAppDispatch } from "../../../hooks";
import { useAppSelector } from "../../../hooks";
import { selectTradingData } from "../slices/tradings-data.slice";


export const TradingNavbar = () => {
  const tradingsData: TTradingData[] = useAppSelector((state) =>
    selectTradingData(state)
  );
  const dispatch = useAppDispatch();
  const tradingNavButtonHandler = (runningTradingId: string) => {
    dispatch(chooseСurrentVisibleTrading(runningTradingId));
  };

  return (
    <section className="trading-navbar">
      {tradingsData
        ? (tradingsData as TTradingData[]).map((trading: any) => (
            <button
              className="trading-navbar-button"
              key={trading.tradingId}
              onClick={() => tradingNavButtonHandler(trading.tradingId)}
            >
              {trading.tradingName}
            </button>
          ))
        : "Данные не получены"}
    </section>
  );
};

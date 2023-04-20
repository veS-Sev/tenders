import { useFetchService } from "../../../pages/traiding-page/hooks/useFetchService.hook";
import { useDispatch } from "react-redux";
import {
  chooseСurrentVisibleTrading
} from "../slices/tradings.slice";
import { TTradingData } from "../types/index";

export const TradingNavbar = () => {
  const tradingsData: any = useFetchService("http://localhost:3001/tradings");

  const dispatch = useDispatch();
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

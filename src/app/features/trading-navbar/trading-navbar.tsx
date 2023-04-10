import { useFetchService } from "../../pages/traiding-page/hooks/useFetchService.hook";
import { useDispatch } from "react-redux";
import { chooseVisibleTrading } from "../../store/slices/trading.slice";
import { TradingsData } from "./types/tradings-data.type";
export const TradingNavbar = () => {
  const tradingsData: TradingsData | null = useFetchService(
    "http://localhost:3001/tradings"
  );
  const dispatch = useDispatch();
  return (
    <section className="trading-navbar">
      {tradingsData
        ? (tradingsData as TradingsData).map((trading: any) => (
            <button
              className="trading-navbar-button"
              key={trading.tradingId}
              onClick={() => dispatch(chooseVisibleTrading(trading.tradingId))}
            >
              {trading.tradingName}
            </button>
          ))
        : "Данные не получены"}
    </section>
  );
};

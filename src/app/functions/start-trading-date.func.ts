import { startTradingConst } from "../constants/start-trading.const";

export const startTradingDate = (): number => {
  
  return Number(
    new Date(
      startTradingConst.year,
      (startTradingConst.month-1),
      startTradingConst.day,
      startTradingConst.hour,
      startTradingConst.min,
      startTradingConst.sec
    )
  );
};

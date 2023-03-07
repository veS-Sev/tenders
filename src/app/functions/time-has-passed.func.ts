import { startTradingDate } from "./start-trading-date.func";

export const timeHasPassed = () => Number(new Date()) - startTradingDate();

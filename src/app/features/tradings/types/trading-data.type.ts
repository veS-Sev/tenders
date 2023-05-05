import { TTradingParticipant, TStartOfTrading,TStartOfTradingData } from "./index";

export type TTradingData = {
    tradingId: string;
    tradingName: string;
    startOfTrading: TStartOfTradingData;
    tradingParamerts: {
      name: string;
      improveStandartActivites?: string;
      price?: string;
      productionTime?: string;
      warranty?: string;
      actions?: string;
      conditionsOfPayment?: string;
    };
    tradingParticipants: TTradingParticipant[];
  };



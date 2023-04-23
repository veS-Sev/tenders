import { TTradingParticipant } from "./trading-participant.type";
export type TTradingData = {
    tradingId: string;
    tradingName: string;
    startTrading: {
      year: string;
      month: string;
      day: string;
      hour: string;
      min: string;
      sec: string;
    };
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



import { TTenderParticipant, TStartOfTender,TStartOfTenderData } from "./index";

export type TTenderData = {
    id: string;
    tenderName: string;
    startOfTender: TStartOfTenderData;
    tenderParamerts: {
      name: string;
      improveStandartActivites?: string;
      price?: string;
      productionTime?: string;
      warranty?: string;
      actions?: string;
      conditionsOfPayment?: string;
    };
    tenderParticipants: TTenderParticipant[];
  };



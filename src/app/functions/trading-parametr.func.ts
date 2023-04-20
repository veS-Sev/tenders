export const tradingParametr = (tradingData:any,tradingId: string, parametr: string) => {
    return tradingData.find((x: any) => x.tradingId === tradingId)![parametr];
  };
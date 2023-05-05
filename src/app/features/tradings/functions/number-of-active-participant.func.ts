
export const idOfActiveParticipant = (activeParticipantByIndex:any,tradingParticipants:any,startOfTrading:any) => {
    const idexOfParticipant = activeParticipantByIndex(
      tradingParticipants,
      startOfTrading
    );
    return tradingParticipants[idexOfParticipant].id;
  };
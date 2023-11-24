
export const idOfActiveParticipant = (activeParticipantByIndex:any,tenderParticipants:any,startOfTender:any) => {
    const idexOfParticipant = activeParticipantByIndex(
      tenderParticipants,
      startOfTender
    );
    return tenderParticipants[idexOfParticipant].id;
  };
import {memo} from 'react';
import { TTenderParticipant } from '../../tenders/types';
export type FormsProps={
    tenderParticipants: TTenderParticipant[];
 }

export const Forms=memo(function Forms({tenderParticipants}:FormsProps){
    
return( <>
    {tenderParticipants.map((participant: any) => (
    <form
      onSubmit={(e) => e.preventDefault()}
      key={participant.id}
      id={participant.id}
    ></form>
  ))}</>

)
})
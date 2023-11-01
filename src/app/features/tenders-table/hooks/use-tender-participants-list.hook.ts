import {useGetOffersForTenderQuery} from '../api/tender.api';

export const useTendersParticipantsList=(tenderId:string|undefined)=>{
const {data}=useGetOffersForTenderQuery(tenderId)
const list=new Set();
//нужно добавить тип в котором будет tenderтип(есть)+участник + айдишник

data&&data.forEach((offer:any)=>{
    list.add(offer?.participantId)})
// console.log('commonList',list)
return Array.from(list)
}



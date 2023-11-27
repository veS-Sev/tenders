import { useGetOffersForTenderQuery } from "../api/tender.api";
import {useTendersParticipantsList} from './use-tender-participants-list.hook'
import { useParams } from "react-router-dom";
import {TTenderParticipant} from '../types'

//  получаем массив последних офферов
export const useActualParticipantOffersForTender = (
) => {
  const { id } = useParams();
  //получаю список участников торга
  const participantsList: any[] = useTendersParticipantsList(id);
  //получаем данные по тендеру
  const { data,isSuccess:actualOffersIsSuccess,isFetching:actualOffersIsFetching,isLoading:actualOffersIsLoading,isUninitialized:actualOffersIsUninitialized} = useGetOffersForTenderQuery(id);
  
  const actualOffers: TTenderParticipant[] = [];
  //отсортировываю оферы каждого участника
  participantsList.forEach((participant) => {
    //каждый раз создаем массив в который отфильтровываются предложения по участнику.
    const offers = data.filter(
      (offer: any) => offer.participantId === participant
    );
    //теперь в этом массиве получаем самый новый по дате оффер и кладем его в общий массив
    offers.forEach((elem: any) => {
      //проверяем есть ли уже в массиве-результате оффер от текущего участника
      let findedOffer = actualOffers.find(
        (i: any) => i.participantId === elem.participantId
      );
      if (findedOffer === undefined) {
        actualOffers.push(elem);
      } else if (elem?.offerDate > findedOffer.offerDate) {
        actualOffers.splice(actualOffers.indexOf(findedOffer), 1, elem);
      }
    });
 
  });
  return {actualOffers,actualOffersIsSuccess,actualOffersIsFetching,actualOffersIsLoading, actualOffersIsUninitialized}
};

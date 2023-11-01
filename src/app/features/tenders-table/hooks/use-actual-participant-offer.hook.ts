import { useGetOffersForTenderQuery } from "../api/tender.api";
import {useTendersParticipantsList} from './use-tender-participants-list.hook'
import { useParams } from "react-router-dom";
// этот вариант подучает массив последних офферов
export const useActualParticipantOffersForTender = (
  // tenderId: string | undefined,
  participantsList: string[]
) => {
  const { id } = useParams();
  // const participantsList = useTendersParticipantsList(tenderId);
  console.log('tenderId HOOK',id)
  //получаем данные по тендеру
  const { data } = useGetOffersForTenderQuery(id);
  console.log('data HOOK', data )
  // создаю пустой массив
  const lastOffers: any[] = [];
  //отсортировываю оферы каждого учатсника
  participantsList.forEach((participant) => {
    //каждый раз создаем массив в который отфильтровываются предложения по участнику.
    const offers = data.filter(
      (offer: any) => offer.participantId === participant
    );
    //теперь в этом массиве получаем самый новый по дате оффер и кладем его в общий массив
    offers.forEach((elem: any) => {
      //проверяем есть ли уже в массиве-результате оффер от текущего участника
      let findedOffer = lastOffers.find(
        (i: any) => i.participantId === elem.participantId
      );
      if (findedOffer === undefined) {
        lastOffers.push(elem);
      } else if (elem?.offerDate > findedOffer.offerDate) {
        lastOffers.splice(lastOffers.indexOf(findedOffer), 1, elem);
      }
    });
 
  });
  console.log('lastOffers HOOK',lastOffers)
  return lastOffers;
};

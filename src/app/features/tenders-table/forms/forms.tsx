import { memo } from "react";
import { TTenderParticipant } from "../../tenders/types";
import {
  useMakeOfferMutation,useGetTenderParticipantOffersQuery
} from "../api/tender.api";
// import {useTendersParticipantsList} from '../hooks/use-tender-participants-list.hook'


export type FormsProps = {
  tenderParticipants: TTenderParticipant[];
  // tenderParticipants: any[];
  tenderId: string|undefined;
};

export const Forms = memo(function Forms({
  tenderId,
  tenderParticipants
}: FormsProps) {

  const [makeOffer] = useMakeOfferMutation();

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
    participantId: string
  ) => {
    e.preventDefault();
console.log('событие формы')
    const form = e.currentTarget;

    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    //отправляем данные из таблицы, к ним автоматически добавляют сгенерированный айдишник
    const offerDate = new Date();
    await makeOffer({
      tenderId,
      participantId,
      offerDate: offerDate,
      ...formJson,
    }).unwrap();

  };
  console.log('tenderParticipants FORMS',tenderParticipants)
return  (
    <>
      {tenderParticipants.map((participant: any) => (
        <form
          onSubmit={(e) => handleForm(e, participant?.participantId)}
          key={participant.participantId}
          id={participant.participantId}
        ></form>
      ))}
    </>
  );
});

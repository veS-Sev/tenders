import { memo } from "react";
import { TTenderParticipant } from "../../tenders/types";
import {
  useMakeOfferMutation
} from "../api/tender.api";

export type FormsProps = {
  tenderParticipants: TTenderParticipant[];
  tenderId: string;
};

export const Forms = memo(function Forms({
  tenderId,
  tenderParticipants,
}: FormsProps) {

  const [makeOffer] = useMakeOfferMutation();

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
    participantId: string
  ) => {
    e.preventDefault();

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

  return (
    <>
      {tenderParticipants.map((participant: any) => (
        <form
          onSubmit={(e) => handleForm(e, participant?.id)}
          key={participant.id}
          id={participant.id}
        ></form>
      ))}
    </>
  );
});

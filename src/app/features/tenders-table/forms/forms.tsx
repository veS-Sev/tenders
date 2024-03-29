import { memo } from "react";
import { useParams } from "react-router-dom";
import { TTenderParticipant } from "../../tenders/types";
import {
  useMakeOfferMutation
} from "../api/tender.api";
import { useTendersParticipantsList } from "../hooks/use-tender-participants-list.hook";

export type FormsProps = {
  tenderParticipants: TTenderParticipant[];
  tenderId: string | undefined;
};

export const Forms = memo(function Forms() {
  const { id: tenderId } = useParams();
  //получаю список участников торга
  const tenderParticipants: any[] = useTendersParticipantsList(tenderId);

  const [makeOffer] = useMakeOfferMutation();

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
    participantId: string
  ) => {
    e.preventDefault();
    console.log("событие формы");
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
      {tenderParticipants.map((participant: string) => (
        <form
          onSubmit={(e) => handleForm(e, participant)}
          key={participant}
          id={participant}
        ></form>
      ))}
    </>
  );
});

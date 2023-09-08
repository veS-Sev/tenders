import { memo } from "react";
import { TTenderParticipant } from "../../tenders/types";
import { useMakeOfferMutation } from "../api/tender.api";
export type FormsProps = {
  tenderParticipants: TTenderParticipant[];
  tenderId: string;
};

export const Forms = memo(function Forms({
  tenderId,
  tenderParticipants,
}: FormsProps) {
  const [makeOffer, { data, isError }] = useMakeOfferMutation();

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
    participantId: string
  ) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    //тут нужно написать, что мы отправляем на сервак
    console.log("tenderId", tenderId);
    //отправляем данные из таблицы, к ним автоматически добавляют сгенерированный айдишник
    // await makeOffer(formJson).unwrap()
    let body = { name: `SUCCESS ${new Date()}` };
    console.log("{tenderId,body}", { tenderId, body });
    // в этом случае не отправляется на сервер tenderId
    await makeOffer({ tenderId, body }).unwrap();
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

import { memo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import {
  useMakeOfferMutation
} from "../api/tender.api";
import { useTendersParticipantsList } from "../hooks/use-tender-participants-list.hook";
import { offerIsChanging } from "../store/offer-change.slice";

export const TableForms = memo(function Forms() {
  const dispatch=useAppDispatch();
  const { id: tenderId } = useParams();
  //получаю список участников торга
  const tenderParticipants: any[] = useTendersParticipantsList(tenderId);

  const [makeOffer] = useMakeOfferMutation();

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
    participantId: string
  ) => {
    e.preventDefault();
    dispatch(offerIsChanging({hasChanged:false}))
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

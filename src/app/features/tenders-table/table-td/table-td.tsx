import { TTenderParameters } from "../types/index";
import { useAppSelector,useAppDispatch } from "../../../hooks";
import { TTableTd } from "./table-td.type";
import { CustomInput } from "../../../components/input/custom-input";
import { CustomButton } from "../../../components/button/custom-button";
import { offerIsChanging } from "../store/offer-change.slice";

export const TableTd = ({
  participant,
  currentParameter,
  index,
  name,
  actions,
}: TTableTd) => {
  const activeTimerParticipant = useAppSelector(
    (state) => state.activeTimerParticipant.id
  );
const dispatch=useAppDispatch();
  const changeForm=useAppSelector((state)=>state.offerChange)

  const disableOfferButton=(participantId:string,form:string,activeTimerParticipant:string|null )=>{
    console.log('changeForm.offerForm',changeForm.offerForm)
    const conditionsCompleted=changeForm.offerForm!==form||
    activeTimerParticipant !==participantId||
    changeForm.hasChanged===false
     return conditionsCompleted
  }
  

  let cellContent;
  if (currentParameter === name) {
    cellContent = (
      <>
        <span className={"number-in-order"}>Участник {index + 1}</span>
        <span className={"participant-name"}>
          {participant[currentParameter as keyof TTenderParameters]}
        </span>
      </>
    );
  } else if (currentParameter === actions) {
    cellContent = (
      <>
        <CustomButton
          disabled={disableOfferButton(participant.participantId,participant.participantId,activeTimerParticipant)}
          form={participant.participantId}
          type={"submit"}
          text={"Сделать ход"}   
//           onClick={()=>{
// dispatch(offerIsChanging({hasChanged:false}))
            // здесь нужно продиспачить изменения в changeForm
          // }
        // }
        />
      </>
    );
  } else {
    cellContent = (
      <>
        <CustomInput
          disabled={activeTimerParticipant !== participant.participantId}
          startValue={participant[currentParameter as keyof TTenderParameters]}
          name={currentParameter}
          form={participant.participantId}
        />
      </>
    );
  }
  const activeClassNameByTimer = (participantId: string) =>
    activeTimerParticipant === participantId
      ? "active participant-column"
      : "participant-column";

  return (
    <td className={activeClassNameByTimer(participant.id)} key={participant.id}>
      {cellContent}
    </td>
  );
};

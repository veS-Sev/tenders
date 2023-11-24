import { TTenderParameters } from "../../../features/tenders/types/index";
import { useAppSelector } from "../../../hooks";
import { TTableTd } from "./table-td.type";
import { CustomInput } from "../../../components/input/custom-input";
import { CustomButton } from "../../../components/button/custom-button";

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
          disabled={activeTimerParticipant !== participant.participantId}
          form={participant.participantId}
          type={"submit"}
          text={"Сделать ход"}
          
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

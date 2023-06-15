import { TTenderParameters } from "../../../features/tenders/types/index";
import { useAppSelector } from "../../../hooks";
import { TTableTd } from "./table-td.type";
import { CustomInput } from "../../../components/input/custom-input";
import { CustomButton } from "../../../components/button/custom-button";

export const TableTd = ({
  participant,
  currentParametr,
  index,
  name,
  actions,
}: TTableTd) => {
  const activeTimerParticipant = useAppSelector(
    (state) => state.activeTimerParticipant.id
  );

  let cellContent;
  if (currentParametr === name) {
    cellContent = (
      <>
        <span className={"number-in-order"}>Участник {index + 1}</span>
        <span className={"participant-name"}>
          {participant[currentParametr as keyof TTenderParameters]}
        </span>
      </>
    );
  } else if (currentParametr === actions) {
    cellContent = (
      <>
        <CustomButton
          disabled={activeTimerParticipant !== participant.id}
          form={participant.id}
          type={"submit"}
          text={"Сделать ход"}
        />
      </>
    );
  } else {
    cellContent = (
      <>
        <span>{participant[currentParametr as keyof TTenderParameters]}</span>
        <CustomInput
          disabled={activeTimerParticipant !== participant.id}
          startValue={participant[currentParametr as keyof TTenderParameters]}
          name={currentParametr}
          form={participant.id}
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

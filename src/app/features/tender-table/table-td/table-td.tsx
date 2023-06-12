import { JsxElement } from "typescript";
import { TTenderParameters } from "../../../features/tenders/types/index";
import { useAppSelector } from "../../../hooks";
import {TTableTd} from "./table-td.type"


export const TableTd = ({
  participant,
  currentParametr,
  index,
  name,
  actions
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
        <button
          disabled={activeTimerParticipant !== participant.id}
          form={participant.id}
        >
          Сделать ход
        </button>
      </>
    );
  } else {
    cellContent = (
      <>
        <span>{participant[currentParametr as keyof TTenderParameters]}</span>
        <input
          disabled={activeTimerParticipant !== participant.id}
          type="text"
          form={participant.id}
        />
      </>
    );
  }
  const activeClassName = (participantId: string) =>
    activeTimerParticipant === participantId
      ? "active participant-column"
      : "participant-column";

  return <td className={activeClassName(participant.id)} key={participant.id}>{cellContent}</td>;
};

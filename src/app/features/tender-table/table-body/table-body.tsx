import "./table-body.scss";
import { useAppSelector } from "../../../hooks";
import { TTenderParameters } from "../../../features/tenders/types/index";

export const TableBody = () => {
  const tender: any = useAppSelector((state) => state.tenderTable.tenderData);

  const activeTimerParticipant = useAppSelector(
    (state) => state.activeTimerParticipant.id
  );

  const tenderParticipants = tender.tenderParticipants;

  return (
    <>
      <tbody>
        {Object.getOwnPropertyNames(tender.tenderParamerts).map(
          (parametr: string) => (
            <tr key={parametr}>
              <th key={parametr}>
                {tender.tenderParamerts[parametr as keyof TTenderParameters]}
              </th>
              {tenderParticipants.map(
                //должен быть установлен тип
                (participant: any, index: number) => (
                  <td
                    className={
                      activeTimerParticipant === participant.id
                        ? "active participant-column"
                        : "participant-column"
                    }
                    key={participant.id}
                  >
                    {(parametr as keyof TTenderParameters) === "name" ? (
                      <>
                        <span className={"number-in-order"}>
                          Участник{index + 1}
                        </span>
                        <span className={"participant-name"}>
                          {participant[parametr as keyof TTenderParameters]}
                        </span>
                      </>
                    ) : (
                      participant[parametr as keyof TTenderParameters]
                    )}
                    {(parametr as keyof TTenderParameters) === "actions" && (
                      <>
                        <button disabled={activeTimerParticipant != participant.id}>Сделать ход</button>
                      </>
                    )}
                  </td>
                )
              )}
            </tr>
          )
        )}
      </tbody>
    </>
  );
};

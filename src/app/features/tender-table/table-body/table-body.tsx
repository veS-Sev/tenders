import "./table-body.scss";
import { useAppSelector } from "../../../hooks";
import { TTenderParameters } from "../../../features/tenders/types/index";
import { TTenderParticipant } from "../../tenders/types";
import { TableTd } from "../table-td/table-td";
export const TableBody = () => {
  const tender: any = useAppSelector((state) => state.tenderTable.tenderData);
  const tenderParticipants = tender.tenderParticipants;
  const tenderParametrsName = Object.getOwnPropertyNames(
    tender.tenderParamerts
  );

  // Можно вывести в отдельный компонент Forms


  return ( 
    <>
     
      <tbody>
        {tenderParametrsName.map((parametr: string) => (
          <tr key={parametr}>
            <th key={parametr}>
              {tender.tenderParamerts[parametr as keyof TTenderParameters]}
            </th>
            {tenderParticipants.map(
              (participant: TTenderParticipant, index: number) => (

                <TableTd
                  key={participant.id}
                  participant={participant}
                  currentParametr={parametr}
                  index={index}
                  name={"name"}
                  actions={"actions"}
                />
              )
            )}
          </tr>
        ))}
      </tbody>
    </>
  );
};

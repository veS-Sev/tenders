import "./table-body.scss";
import { useAppSelector } from "../../../hooks";
import { useGetTenderQuery } from "../api/tender.api";
import { TTenderParameters } from "../../../features/tenders/types/index";
import { TTenderParticipant } from "../../tenders/types";
import { TableTd } from "../table-td/table-td";

export const TableBody = () => {
  const tenderId: any = useAppSelector(
    (state) => state.activeTender.activeTender
  );

  const { data, isSuccess } = useGetTenderQuery(tenderId);

  const tenderParticipants = isSuccess && data.tenderParticipants;
  const tenderParameters = isSuccess && data.tenderParameters;

  // Можно вывести в отдельный компонент Forms

  let content;
  if (isSuccess && data) {
    const tenderParametersName = Object.getOwnPropertyNames(tenderParameters);

    content = tenderParametersName.map((parameter: string) => (
      <tr key={parameter}>
        <th key={parameter}>
          {data.tenderParameters[parameter as keyof TTenderParameters]}
        </th>
        {tenderParticipants.map(
          (participant: TTenderParticipant, index: number) => (
            <TableTd
              key={participant.id}
              participant={participant}
              currentParameter={parameter}
              index={index}
              name={"name"}
              actions={"actions"}
            />
          )
        )}
      </tr>
    ));
  }
  return (
    <>
      <tbody>{content}</tbody>
    </>
  );
};

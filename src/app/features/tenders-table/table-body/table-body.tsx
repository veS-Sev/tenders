import "./table-body.scss";
import { useAppSelector } from "../../../hooks";
import { useGetTenderQuery } from "../api/tender.api";
import { TTenderParameters } from "../types/index";
import { TTenderParticipant } from "../types";
import { TableTd } from "../table-td/table-td";
import {TTableBody} from './table-body.type'

export const TableBody = ({actualOffers}:TTableBody) => {
  const tenderId: string|undefined = useAppSelector(
    (state) => state.activeTender.activeTender
  );
  const { data, isSuccess } = useGetTenderQuery(tenderId);

  const tenderParameters = isSuccess && data.tenderParameters;

  const tenderOffers =  actualOffers;


  let content;
  if (isSuccess && data) {
    const tenderParametersName = Object.getOwnPropertyNames(tenderParameters);
    content = tenderParametersName.map((parameter: string) => (
      <tr key={parameter}>
        <th key={parameter}>
          {data.tenderParameters[parameter as keyof TTenderParameters]}
        </th>
        {tenderOffers&&
        tenderOffers.map(
          (participant: TTenderParticipant, index: number) => (
            <TableTd
              key={`${participant.participantId} ${parameter}`}
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

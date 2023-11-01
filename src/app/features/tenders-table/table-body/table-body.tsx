import "./table-body.scss";
import { useEffect } from "react";
import { useAppSelector } from "../../../hooks";
import { useGetTenderQuery } from "../api/tender.api";
import { TTenderParameters } from "../../../features/tenders/types/index";
import { TTenderParticipant } from "../../tenders/types";
import { TableTd } from "../table-td/table-td";
import {
  useTendersParticipantsList,
  useActualParticipantOffersForTender,
} from "../hooks";

export const TableBody = () => {
  const tenderId: any = useAppSelector(
    (state) => state.activeTender.activeTender
  );
  const { data, isSuccess } = useGetTenderQuery(tenderId);
  console.log("tenderQuery", data);

  const tenderParameters = isSuccess && data.tenderParameters;
  const participantsList: any[] = useTendersParticipantsList(tenderId);


  const actualOffers = useActualParticipantOffersForTender(
    participantsList
  );
  console.log("actualOffers TB", actualOffers);
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

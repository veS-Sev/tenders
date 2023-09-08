import "./table-container.scss";
import { ColorRing } from "react-loader-spinner";

import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
import { useAppDispatch } from "../../hooks";
import { dateConversion } from "./functions/date-conversion.func";
import { timeHasPassed } from "../../functions/index";
import { showStartDateText } from "../tender-table/functions/show-start-date-text.func";
import { useParams } from "react-router-dom";
import { useGetTenderQuery } from "./api/tender.api";
import { TStartOfTenderData } from "../tenders/types";
import { Forms } from "./forms/forms";

export const TableContainer = () => {
  const { id } = useParams();

  const { data, isSuccess, isError, refetch } = useGetTenderQuery(id);
  const dispatch = useAppDispatch();

  let content;
  let title;

  if (isSuccess && data) {
    const startOfTenderData: TStartOfTenderData = data?.startOfTender;
    const startOfTender = dateConversion(startOfTenderData);

    const numberOfParticipants = data && data?.tenderParticipants;
    title = (
      <h1 className="traiding-table-name">
        Ход торгов:
        <span>
          Тестовые торги на
          {data?.tenderName}.
        </span>
        {showStartDateText(startOfTender)}
      </h1>
    );
    if (timeHasPassed(startOfTender) < 0) {
      content = <h3>Торги еще не начались</h3>;
    } else if (!numberOfParticipants) {
      content = <h3>Участников нет. Торги признаны несостоявшимися</h3>;
    } else {
      const tenderParticipants = data.tenderParticipants;
      content = (
        <>
          <Forms tenderParticipants={tenderParticipants} tenderId={data.id} />
          <table className="traiding-table">
            <TableHead />
            <TableBody />
          </table>
        </>
      );
    }
  } else if (isError) {
    content = <h3>Данные не загружены</h3>;
  } else {
    content = (
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    );
  }

  const clearCash = () => {
    console.log("очищаем кеш");
    refetch();
  };

  return (
    <>
      {title}
      <button type="button" onClick={clearCash}>
        {"Обновить данные"}
      </button>
      {content}
    </>
  );
};

import "./table-container.scss";
import { ColorRing } from "react-loader-spinner";
import { useEffect } from "react";
import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { dateConversion } from "./functions/date-conversion.func";
import { timeHasPassed } from "../../functions/index";
import { showStartDateText } from "../tender-table/functions/show-start-date-text.func";
import { useParams } from "react-router-dom";
import { fetchTenderById } from "./store/fetch-tender-by-id.slice";
import { TStartOfTenderData } from "../tenders/types";
import { Forms } from "./forms/forms";
export const TableContainer = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const loadingStatus = useAppSelector((state) => state.tenderTable.status);

  useEffect(() => {
    id && dispatch(fetchTenderById(id));
  }, [id, dispatch]);

  const tenderData = useAppSelector((state) => state.tenderTable.tenderData);
  let content;
  let title;
  if (loadingStatus === "succeeded" && tenderData) {
    const startOfTenderData: TStartOfTenderData = tenderData.startOfTender;
    const startOfTender = dateConversion(startOfTenderData);
    const numberOfParticipants = tenderData && tenderData?.tenderParticipants;
    title = (
      <h1 className="traiding-table-name">
        Ход торгов:
        <span>
          Тестовые торги на
          {tenderData?.tenderName}.
        </span>
        {showStartDateText(startOfTender)}
      </h1>
    );
    if (timeHasPassed(startOfTender) < 0) {
      content = <h3>Торги еще не начались</h3>;
    } else if (!numberOfParticipants) {
      content = <h3>Участников нет. Торги признаны несостоявшимися</h3>;
    } else {
      const tenderParticipants=tenderData.tenderParticipants
      console.log('tenderParticipants',tenderParticipants)
      content = (
        <>
          <Forms tenderParticipants={tenderParticipants}/>
          <table className="traiding-table">
            <TableHead />
            <TableBody />
          </table>
        </>
      );
    }
  } else if (loadingStatus === "failed") {
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

  return (
    <>
      {title}
      {content}
    </>
  );
};

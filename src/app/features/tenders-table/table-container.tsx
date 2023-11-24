import "./table-container.scss";
import { ColorRing } from "react-loader-spinner";
import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
import { dateConversion } from "./functions/date-conversion.func";
import { timeHasPassed } from "../../functions/index";
import { showStartDateText } from "../tenders-table/functions/show-start-date-text.func";
import { useParams } from "react-router-dom";
import {
  useGetOffersForTenderQuery,
  useGetTenderQuery,
} from "./api/tender.api";
import { TStartOfTenderData } from "../tenders/types";
import { Forms } from "./forms/forms";
import {
  useActualParticipantOffersForTender,
} from "./hooks";


export const TableContainer = () => {
  const { id } = useParams();
  //получаем все офферы по айди торга
  const { isSuccess: offersDataIsSuccess } =
    useGetOffersForTenderQuery(id);
  //получаем все данные по торгу, кроме офферов
  const { data, isSuccess, isError} = useGetTenderQuery(id);

  const {actualOffers, actualOffersIsSuccess}=
    useActualParticipantOffersForTender();

  let content;
  let title;

  if (isSuccess && offersDataIsSuccess&&actualOffersIsSuccess&&actualOffers) {
    const startOfTenderData: TStartOfTenderData = data?.startOfTender;
    const startOfTender = dateConversion(startOfTenderData);
  
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
    } else if (actualOffers.length === 0) {
      content = <h3>Участников нет. Торги признаны несостоявшимися</h3>;
    } else if(actualOffers.length!==0) {
      content = (
        <>
          <Forms />
          <table className="traiding-table">
            <TableHead actualOffers={actualOffers}/>
            <TableBody actualOffers={actualOffers}/>
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


  return (
    <>
      {title}
      {content}
    </>
  );
};

import "./table-container.scss";
import{useState,useEffect} from 'react';
import { ColorRing } from "react-loader-spinner";
import {actualOffersTest} from './functions/actual-offers.func'
import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
import { useAppDispatch } from "../../hooks";
import { dateConversion } from "./functions/date-conversion.func";
import { timeHasPassed } from "../../functions/index";
import { showStartDateText } from "../tenders-table/functions/show-start-date-text.func";
import { useParams } from "react-router-dom";
import { useGetOffersForTenderQuery, useGetTenderQuery } from "./api/tender.api";
import { TStartOfTenderData } from "../tenders/types";
import { Forms } from "./forms/forms";
import {useTendersParticipantsList,useActualParticipantOffersForTender} from './hooks';
import {TTenderParticipant} from '../tenders/types'

export const TableContainer = () => {
  const { id } = useParams();
  
//получаем все данные по торгу, кроме офферов
  const { data, isSuccess, isError, refetch } = useGetTenderQuery(id);
  console.log('data, isSuccess TC',data, isSuccess)
  //получаем все офферы по айди торга
  const {data:offersData}=useGetOffersForTenderQuery(id)

console.log('offersData TC',offersData)
//получаем список участников в виде???
const participantsList:any[]=useTendersParticipantsList(id);
console.log('participantsList TC',participantsList)
//получаем только последние по дате предложения
const actualOffers:TTenderParticipant[]=useActualParticipantOffersForTender(participantsList)

console.log('actualOffers TC' ,actualOffers)
  let content;
  let title;

  if (isSuccess && data&&offersData ) {
    const startOfTenderData: TStartOfTenderData = data?.startOfTender;
    const startOfTender = dateConversion(startOfTenderData);

    const numberOfParticipants = data && actualOffers.length>0;
    // console.log('numberOfParticipants',numberOfParticipants)
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
    } else if (actualOffers.length===0) {
      content = <h3>Участников нет. Торги признаны несостоявшимися</h3>;
    } else {
      const tenderParticipants = actualOffers;
      // console.log('tenderParticipants СОТЕФШТУК',tenderParticipants)
      content = (
        <>
          <Forms tenderParticipants={tenderParticipants} tenderId={id} />
          <table className="traiding-table">
            <TableHead />
            <TableBody />
          </table>
        </>
      );
    }
  } else if (isError) {
    content = <h3>Данные не загружены</h3>;
  } else if(data===undefined || offersData===undefined ) {
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

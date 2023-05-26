import "./table-container.scss";
import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
import { useAppSelector } from "../../hooks";
import { selectTenderById } from "../tenders/slices/tenders-data.slice";
import { dateConversion } from "../../features/tenders/functions/date-conversion.func";
import { TStartOfTenderData, TTenderParticipant } from "../tenders/types";
import { timeHasPassed } from "../../functions/index";
import {showStartDateText} from './functions/show-start-date-text.func';


export const TableContainer = ({tender}:any) => {
  const activeTender = useAppSelector(
    (state) => state.activeTender.activeTender
  );

  const tenderData = useAppSelector((state) =>
    selectTenderById(state, activeTender)
  );
  const startOfTenderData: TStartOfTenderData = tender?.startOfTender;

  const startOfTender = dateConversion(startOfTenderData);
  const tenderParticipants: TTenderParticipant[] =
    tenderData.tenderParticipants;
  
  return (
    <>
      <h1 className="traiding-table-name">
        Ход торгов:
        <span>
          Тестовые торги на
          {tenderData.tenderName}. 
        </span>
        {showStartDateText(startOfTender)}
      </h1>
      {timeHasPassed(startOfTender) < 0?<div>Торги еще не начались</div>:(!tenderParticipants?<div>Нет участников</div>:
      (<>
             <div className="traiding-table-notice">
               Уважаемые участники, во время ходы вы можете изменить параметры
               торгов, указанных в таблице:
             </div>
             <table className="traiding-table">
               <TableHead 
               tender={tenderData} 
               />
               <TableBody tender={tenderData} />
             </table>
           </>
        ))
      }
    </>
  );
};


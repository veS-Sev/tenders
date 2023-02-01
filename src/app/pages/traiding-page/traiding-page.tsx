import '../traiding-page/traiding-page.scss'
import { TableContainer } from "../../components/table/table-container";
export const TraidingPage = () => {
  return (
    <div>
    <h1 className="traiding-name">Ход торгов:<span> Тестовые торги на аппарат ЛОТОС №2033564(Дата, время. Текущие?)</span></h1>
    <div className="traiding-notice">Уважаемые участники, во время ходы вы можете изменить параметры торгов, указанных в таблице:</div>
      <TableContainer />
    </div>
  );
};

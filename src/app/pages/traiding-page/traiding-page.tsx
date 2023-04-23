import "../traiding-page/traiding-page.scss";
import { TradingNavbar } from "../../features/tradings/trading-navbar/trading-navbar";
import { TableContainer } from "../../features/trading-table/table-container";
import { useFetchService } from "../../pages/traiding-page/hooks/useFetchService.hook";
import {  useSelector } from "react-redux";
import { chooseСurrentVisibleTrading } from "../../features/tradings/slices/tradings.slice";
import { tradingParametr } from "../../functions/index";


import {ColorRing}from 'react-loader-spinner';

export const TraidingPage = () => {
  const tradingData: any = useFetchService("http://localhost:3001/tradings");
  const activeTradingSelector = useSelector(chooseСurrentVisibleTrading);

  return (
    <>
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
      <TradingNavbar />
      <div>
        <h1 className="traiding-name">
          Ход торгов:
          <span>
            Тестовые торги на
            {tradingData &&
              ` ${tradingParametr(
                tradingData,
                activeTradingSelector.payload.activeTrading.activeTrading,
                "tradingName"
              )}`}
            (Дата, время. Текущие?)
          </span>
        </h1>
        <div className="traiding-notice">
          Уважаемые участники, во время ходы вы можете изменить параметры
          торгов, указанных в таблице:
        </div>
        <TableContainer />
      </div>
    </>
  );
};

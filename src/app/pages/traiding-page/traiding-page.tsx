import "../traiding-page/traiding-page.scss";
import { ColorRing } from "react-loader-spinner";
import { TradingNavbar } from "../../features/tradings/trading-navbar/trading-navbar";
import { TableContainer } from "../../features/trading-table/table-container";
import { useEffect } from "react";
import {
  fetchTradingsData} from "../../features/tradings/slices/tradings-data.slice";
import { useAppSelector } from "../../hooks/useAppSelector.hook";
import { useAppDispatch } from "../../hooks";
import {selectTradingLoadingStatus
} from "../../features/tradings/slices/tradings-data.slice";

export const TraidingPage = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector((state) =>
    selectTradingLoadingStatus(state)
  );
  useEffect(() => {
    if (loadingStatus === "idle") {
      dispatch(fetchTradingsData());
    }
  }, [loadingStatus, dispatch]);

  return (
    <>
      {loadingStatus === "loading" && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
      {loadingStatus === "succeeded" && (
        <>
          <TradingNavbar />
          <TableContainer />
        </>
      )}
      {loadingStatus === "failed" && <p>Данные не загружены</p>}
    </>
  );
};


import "./tender-page.scss";
import { TableContainer } from "../../features/tender-table/table-container";
import { useEffect } from "react";
import {
  fetchTendersData,
  selectTenderById,
} from "../../store/tenders-data.slice";
import { useAppSelector, useAppDispatch } from "../../hooks";


import { selectTenderLoadingStatus } from "../../store/tenders-data.slice";

export const TraidingPage = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector((state) =>
    selectTenderLoadingStatus(state)
  );
  const activeTender = useAppSelector(
    (state) => state.activeTender.activeTender
  );

  const tender = useAppSelector((state) =>
    selectTenderById(state, activeTender)
  );

  useEffect(() => {
    if (loadingStatus === "idle") {
      dispatch(fetchTendersData());
    }
  }, [loadingStatus, dispatch]);

  return (
    <>
      {loadingStatus === "succeeded" && tender && (
        <TableContainer tender={tender} />
      )}

    </>
  );
};

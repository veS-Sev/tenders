import "./tender-navbar.scss";
import { chooseСurrentVisibleTender } from "./store/tenders-list.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectTenderIdsLoadingStatus } from "./store/tenders-list.slice";
import { NavLink, useParams } from "react-router-dom";
import { TTendersList } from "./type/tenders-list.type";
import { useEffect } from "react";

export const TenderNavbar = () => {
  const tendersList:TTendersList[]= useAppSelector(
    (state) => state.activeTender.tenderIdsList
  );
  const dispatch = useAppDispatch();
  const tenderNavHandler = (runningTenderId: string) => {
    dispatch(chooseСurrentVisibleTender(runningTenderId));
  };
  const loadingStatus = useAppSelector((store) =>
    selectTenderIdsLoadingStatus(store)
  );

  const { id } = useParams();

  useEffect(() => {
    if (tendersList.find((item) => item.id === id)) {
      dispatch(chooseСurrentVisibleTender(id));
    }else{dispatch(chooseСurrentVisibleTender(null))}
  }, [id,tendersList,dispatch]);
  return (
    <nav className="tender-navbar">
      {loadingStatus === "succeeded"
        ? tendersList.map((tender) => (
            <NavLink
              to={`tenders/${tender.id}`}
              className="tender-navbar-link"
              key={tender.id}
              onClick={() => tenderNavHandler(tender.id)}
            >
              {tender.tenderName}
            </NavLink>
          ))
        : <div>Данные не получены</div>}
    </nav>
  );
};

import "./tender-navbar.scss";
import { chooseCurrentVisibleTender } from "./store/tenders-list.slice";
import { useAppDispatch} from "../../hooks";
import {useGetTendersListQuery} from "./api/tenders-list.api";
import { NavLink, useParams} from "react-router-dom";
import { TTendersList } from "./type/tenders-list.type";
import { useEffect } from "react";


export const TenderNavbar = () => {
  const {data,isSuccess,isLoading,isFetching}=useGetTendersListQuery({});
  const dispatch = useAppDispatch();
  const tenderNavHandler = (runningTenderId: string|null) => {
    dispatch(chooseCurrentVisibleTender(runningTenderId));
  };
  const { id } = useParams();

  useEffect(() => {
    if(data&&isSuccess){
    if (data.find((item:TTendersList) => item.id === id)) {
      dispatch(chooseCurrentVisibleTender(id));
    }else{dispatch(chooseCurrentVisibleTender(null))}}
  }, [id,data,dispatch,isSuccess,isLoading,isFetching]);

  return (
    <nav className="tender-navbar">
      {isSuccess
        ? data.map((tender:TTendersList) => (
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

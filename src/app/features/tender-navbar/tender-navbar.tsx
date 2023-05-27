import './tender-navbar.scss';
import { chooseСurrentVisibleTender } from "./store/tenders-list.slice";
import { useAppDispatch } from "../../hooks";
import { useAppSelector } from "../../hooks";
import { selectTenderIdsLoadingStatus } from "./store/tenders-list.slice";
import { NavLink } from "react-router-dom";
import {TTendersList} from './type/tenders-list.type';


export const TenderNavbar = () => {
  const tendersList: TTendersList[] = useAppSelector((state) =>
    (state.activeTender.tenderIdsList)
  );
  const dispatch = useAppDispatch();
  const tenderNavButtonHandler = (runningTenderId: string) => {
    dispatch(chooseСurrentVisibleTender(runningTenderId)); 
  };
const loadingStatus=useAppSelector((store)=>selectTenderIdsLoadingStatus(store))

  return (
    <nav className="tender-navbar">
      {loadingStatus==="succeeded"
        ? tendersList.map((tender) => (
            <NavLink
            to={`tenders/${tender.id}`}
              className="tender-navbar-link"
              key={tender.id}
              onClick={() => tenderNavButtonHandler(tender.id)}
            >
               {tender.tenderName}
            </NavLink>
          ))
        : "Данные не получены"}
    </nav>
  );
};


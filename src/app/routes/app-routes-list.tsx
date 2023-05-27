import { Layout } from "../pages/layout/layout";
import { Routes, Route} from "react-router-dom";
import { HomePage } from "../pages/home-page/home-page";
import { TendersPage } from "../pages/tenders-page/tenders-page";
import { TraidingPage } from "../pages/tender-page/tender-page";
import { NotFoundPage } from "../pages/not-found-page/not-faund-page";
import { useAppSelector } from "../hooks";
import {TTendersList} from '../features/tender-navbar/type/tenders-list.type'
export const AppRoutesList = () => {
 const tendersList:TTendersList[]=useAppSelector((state)=>state.activeTender.tenderIdsList)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="tenders" element={<TendersPage />} />{tendersList.map(tender=>
           <Route key={tender.id}path={`tenders/${tender.id}`}
           element={<TraidingPage />}
         />)}
        <Route path="tenders/*" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};



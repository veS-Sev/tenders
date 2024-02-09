import { Layout } from "../pages/layout/layout";
import { Routes, Route} from "react-router-dom";
import { HomePageLazy } from "../pages/home-page/home-page.lazy";
import { TendersPageLazy } from "../pages/tenders-page/tenders-page.lazy";
import { TenderPageLazy } from "../pages/tender-page/tender-page.lazy";
import { NotFoundPageLazy } from "../pages/not-found-page/not-faund-page.lazy";
import { useAppSelector } from "../hooks";
import { ColorRing } from "react-loader-spinner";
import { Suspense } from "react";
export const AppRoutesList = () => {
  const activeTender = useAppSelector(
    (state) => state.activeTender.activeTender
  );
 
  return (
    <Suspense fallback={<ColorRing/>}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<HomePageLazy />} />
        <Route path="tenders" element={<TendersPageLazy />} />
        <Route
          path="tenders/:id"
          element={activeTender ? <TenderPageLazy /> : <NotFoundPageLazy />}
        />
        <Route path="tenders/*" element={<NotFoundPageLazy />} />
        <Route path="*" element={<NotFoundPageLazy />} />
      </Route>
    </Routes>
    </Suspense>
  );
};

import { Layout } from "../pages/layout/layout";
import { Routes, Route} from "react-router-dom";
import { HomePage } from "../pages/home-page/home-page";
import { TendersPage } from "../pages/tenders-page/tenders-page";
import { TenderPage } from "../pages/tender-page/tender-page";
import { NotFoundPage } from "../pages/not-found-page/not-faund-page";
import { useAppSelector } from "../hooks";

export const AppRoutesList = () => {
  const activeTender = useAppSelector(
    (state) => state.activeTender.activeTender
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="tenders" element={<TendersPage />} />
        <Route
          path="tenders/:id"
          element={activeTender ? <TenderPage /> : <NotFoundPage />}
        />
        <Route path="tenders/*" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

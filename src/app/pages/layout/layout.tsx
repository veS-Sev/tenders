import { TenderNavbar } from "../../features/tenders/tender-navbar/tender-navbar";
import { Outlet } from "react-router";
import "../tender-page/tender-page.scss";
import { ColorRing } from "react-loader-spinner";
import { useAppSelector } from "../../hooks/useAppSelector.hook";
import { selectTenderIdsLoadingStatus } from "../../features/tenders/tender-navbar/tenders-list.slice";

export const Layout = () => {
  const loadingStatus = useAppSelector((state) =>
    selectTenderIdsLoadingStatus(state)
  );

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
          <TenderNavbar />
          <Outlet />
        </>
      )}
      {loadingStatus === "failed" && <p>Данные не загружены</p>}
    </>
  );
};

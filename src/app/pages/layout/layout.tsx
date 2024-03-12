import { TenderNavbar } from "../../features/tender-navbar/tender-navbar";
import { Outlet } from "react-router";
import "../tender-page/tender-page.scss";
import { ColorRing } from "react-loader-spinner";
import {useGetTendersListQuery} from '../../features/tender-navbar/api/tenders-list.api'


export const Layout = () => {

  const {isError,isSuccess,isLoading,isFetching}=useGetTendersListQuery({});

  return (
    <>
      {(isLoading||isFetching) && (
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
      {isSuccess && (
        <>
          <TenderNavbar />
          <Outlet />
        </>
      )}
      {isError && <p>Данные не загружены</p>}
    </>
  );
};

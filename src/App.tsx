import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { selectTenderIdsLoadingStatus } from "./app/features/tenders/tender-navbar/tenders-list.slice";
import{fetchTendersList}from './app/features/tenders/tender-navbar/tenders-list.slice';
import { AppRoutesList } from "./app/routes/app-routes-list";
const App = () => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector((state) =>
  selectTenderIdsLoadingStatus(state)
  );

  useEffect(() => {
    if (loadingStatus === "idle") {
      dispatch(fetchTendersList());
    }
  }, [loadingStatus, dispatch]);

  return loadingStatus === "idle" ?<ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />:<AppRoutesList/>
};

export default App;

import "./App.css";
import { useAppDispatch} from "./app/hooks";
import { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import{ getTenderIdsList}from './app/features/tender-navbar/store/tenders-list.slice';
import { AppRoutesList } from "./app/routes/app-routes-list";
import{useGetTendersListQuery} from "./app/features/tender-navbar/api/tenders-list.api"
const App = () => {
  const dispatch = useAppDispatch();

  const {data,isError,isSuccess,isLoading,isUninitialized}=useGetTendersListQuery({});
  useEffect(() => {
    if (data) {
      dispatch(getTenderIdsList(data));
    }
  }, [ dispatch,data,isError,isSuccess,isLoading,isUninitialized]);

  return isLoading ?<ColorRing
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

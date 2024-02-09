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

  return <AppRoutesList/>
};

export default App;


import { useAppDispatch, useAppSelector} from "./app/hooks";
import { useEffect, useState } from "react";
import {changeTheme} from "./app/themes/store/themes-toggle.slice"
import './app/styles/index.scss';
import{ getTenderIdsList}from './app/features/tender-navbar/store/tenders-list.slice';
import { AppRoutesList } from "./app/routes/app-routes-list";
import{useGetTendersListQuery} from "./app/features/tender-navbar/api/tenders-list.api";
import {useTheme} from "./app/themes/hook/useTheme"

const App = () => {
  const dispatch = useAppDispatch();

const {theme, toggleTheme}=useTheme()
  const {data,isError,isSuccess,isLoading,isUninitialized}=useGetTendersListQuery({});
  
  useEffect(() => {
    if (data) {
      dispatch(getTenderIdsList(data));
    }
  }, [ dispatch,data,isError,isSuccess,isLoading,isUninitialized]);

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>{`${theme}`}</button>
      <AppRoutesList/>
      </div>)
};

export default App;

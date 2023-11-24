import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {BASE_ENDPOINT} from '../../../constants/endpoint.const'
export const tendersListApi = createApi({
  reducerPath: "tenderListApi",
  baseQuery: fetchBaseQuery({ baseUrl:BASE_ENDPOINT }),
  endpoints: (build) => ({
    getTendersList: build.query({
      query: () => "tendersList",
    }),
  }),
});

export const {useGetTendersListQuery}=tendersListApi
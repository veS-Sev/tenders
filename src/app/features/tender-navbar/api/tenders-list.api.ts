import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const tendersListApi = createApi({
  reducerPath: "tenderListApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://bv09pq-8080.csb.app/" }),
  endpoints: (build) => ({
    getTendersList: build.query({
      query: () => "tendersList",
    }),
  }),
});

export const {useGetTendersListQuery}=tendersListApi
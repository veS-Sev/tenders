import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// импортировать Tender для типизации

export const tendersApi = createApi({
  reducerPath: "tendersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/tenders" }),
  endpoints: (builder) => ({
    //Здесь нужна типизация в виде builder.query <Tender, string>
    getTenderByName: builder.query({
      query: (name) => `tender/${name}`,
    }),
  }),
});
export const { useGetTenderByNameQuery } = tendersApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// импортировать Trading для типизации

export const tradingsApi = createApi({
  reducerPath: "tradingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/tradings" }),
  endpoints: (builder) => ({
    //Здесь нужна типизация в виде builder.query <Trading, string>
    getTradingByName: builder.query({
      query: (name) => `trading/${name}`,
    }),
  }),
});
export const { useGetTradingByNameQuery } = tradingsApi;


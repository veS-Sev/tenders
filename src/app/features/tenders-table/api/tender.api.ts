import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const tenderApi=createApi({
   reducerPath:'tenderApi',
   baseQuery:fetchBaseQuery({
      baseUrl:'https://bv09pq-8080.csb.app'

   }),
endpoints:(build)=>({
    getTender:build.query({
       query:(id)=>`/tenders/${id}` 
    }),
    makeOffer:build.mutation({
      query:({...body})=>({
         url:`/offers`,
         method:'POST',
         body:body,
         prepareHeaders: (headers:any) => {
            headers.set("Accept", "application/json;")
              return headers
          },
      }),
    })
}),


})
export const {useGetTenderQuery,useMakeOfferMutation}=tenderApi

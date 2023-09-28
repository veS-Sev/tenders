import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_ENDPOINT } from '../../../constants/endpoint.const';

export const tenderApi=createApi({
   reducerPath:'tenderApi',
   baseQuery:fetchBaseQuery({
      baseUrl:BASE_ENDPOINT
   }),
endpoints:(build)=>({
    getTender:build.query({
       query:(id)=>`/tenders/${id}` 
    }),
    getTenderAllOffers:build.query({
      query:(tenderId)=>`/tenders/${tenderId}/offers` 
   }),
   getTenderParticipantOffers:build.query({
      query:({tenderId,participantId})=>`/tenders/${tenderId}/offers?participantId=${participantId}` 
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
export const {useGetTenderQuery,useMakeOfferMutation, useGetTenderAllOffersQuery,useGetTenderParticipantOffersQuery}=tenderApi

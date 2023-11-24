import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_ENDPOINT } from '../../../constants/endpoint.const';

export const tenderApi=createApi({
   reducerPath:'tenderApi',
   tagTypes:['Tender','Offers','Offer'],
   baseQuery:fetchBaseQuery({
      baseUrl:BASE_ENDPOINT
   }),
endpoints:(build)=>({
    getTender:build.query({
       query:(id)=>`/tenders/${id}`,
       providesTags:['Tender']
    }),
    getTenderAllOffers:build.query({
      query:(tenderId)=>`/tenders/${tenderId}/offers`,
      providesTags:['Offers'] 
   }),
   getOffersForTender:build.query({
      query:(tenderId)=>`/offers?tenderId=${tenderId}`,
      providesTags:['Offers'] 
   }),
   getTenderParticipantOffers:build.query({
      query:({tenderId,participantId})=>`/tenders/${tenderId}/offers?participantId=${participantId}`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }:any) => ({ type: 'Offer' as const, id })), 'Offer']
          : ['Offer'],
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
      invalidatesTags:['Offer']
    })
}),


})
export const {useGetTenderQuery,useMakeOfferMutation, useGetTenderAllOffersQuery, useGetOffersForTenderQuery,useGetTenderParticipantOffersQuery}=tenderApi

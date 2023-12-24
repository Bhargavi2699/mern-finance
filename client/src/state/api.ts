import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from "./types"

// allows us have endpoints that we can use to call backend
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main", //name for this particular api call
    tagTypes: ["Kpis", "Products", "Transactions"], //used to keep info, tagTypes-name of each api data
    endpoints: (build) => ({
        //we use getKpis to use baseUrl and make api call to /kpi/kpis
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis/",
            providesTags: ["Kpis"], //so we use these Key Performance Indicators
        }),
        // if you're gonna update or delete, see docs
        getProducts: build.query<Array<GetProductsResponse>, void>({
            //always check your routes in server
            query: () => "product/products/",
            providesTags: ["Products"], //so we use these Key Performance Indicators
        }),
        getTransactions: build.query<Array<GetTransactionsResponse>, void>({
            //always check your routes in server
            query: () => "transaction/transactions/",
            providesTags: ["Transactions"], //so we use these Key Performance Indicators
        }),
    })
})

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api
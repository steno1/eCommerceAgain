import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

import { Base_url } from "../constant"

const baseQuery=fetchBaseQuery({baseUrl:Base_url})

export const apiSlice= createApi({
baseQuery:baseQuery,
tagTypes:["Product", "User", "Order"],
endpoints:(builder)=>({})
})
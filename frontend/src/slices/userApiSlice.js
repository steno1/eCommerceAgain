import { USER_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`, // Corrected url string
        method: "POST",
        body: data
      }),
    }),
    logout:builder.mutation({
     query:()=>({
      url:`${USER_URL}/logout`,
      method:"POST"
     })
    }),
    registerUser:builder.mutation({
      query:(data)=>({
        url:`${USER_URL}`,
        method:"POST",
        body:data
      })
    })
  }),
});

export const { useLoginMutation,useLogoutMutation,
  useRegisterUserMutation} = userApiSlice;

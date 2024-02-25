import { PRODUCTS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags:['Product'],
      keepUnusedDataFor: 5,
    }),

    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, 
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct:builder.mutation({
      query:()=>({
        url:`${PRODUCTS_URL}`,
        method:"POST"
      }),
      invalidatesTags:['Product']
    }),
    updateProduct:builder.mutation({
      query:(data)=>({
        url:`${PRODUCTS_URL}/${data.productId}`,
        method:"PUT",
        body:data
      }),
invalidatesTags:['Product']
    })
  }),
});

export const { useGetProductsQuery,
   useGetSingleProductQuery, 
   useCreateProductMutation,
  useUpdateProductMutation } = productsApiSlice;

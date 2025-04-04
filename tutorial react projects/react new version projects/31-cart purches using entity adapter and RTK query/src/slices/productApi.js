import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "stickers"
        }),
        getSingleProduct: builder.query({
            query: (productId) => `stickers/${productId}`
        })
    })
})
export const { useGetAllProductsQuery, useGetSingleProductQuery } = productApi
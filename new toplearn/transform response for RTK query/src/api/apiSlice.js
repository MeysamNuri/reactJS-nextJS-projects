import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes:["MYBLOG","USERS"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "/blogs", // the route of data base
            // providesTags:['MYBLOG']
            providesTags:(result=[],error,arg)=>[
                "MYBLOG",
                ...result.map(({id})=>({type:"MYBLOG",id}))
            ]
        }),
        getSingleBlog:builder.query({
            query:(initiaalId)=>`/blogs/${initiaalId}`,
            providesTags:(result,error,arg)=>[{type:"MYBLOG",id:arg}]
            //برابر مقدار ورودی هستش که همون یک شناسه می باشد arg  در اینجا چون فقط یک ابجکت پست داریم به این روش نوشتیم و 
        }),
        addNewBlog:builder.mutation({
            query:(initialBlog)=>({
                url:`/blogs`,
                method:"post",
                body:initialBlog
            }),
            invalidatesTags:['MYBLOG ']
        }),
        editBlog:builder.mutation({
            query:(blog)=>({
                url:`/blogs/${blog.id}`,
                method:"put",
                body:blog
            }),
            invalidatesTags:(result,error,arg)=>[{type:"MYBLOG",id:arg.id}]
        }),
        deleteBlog:builder.mutation({
            query:blogId=>({
                url:`/blogs/${blogId}`,
                method:"DELETE"
            }),
            invalidatesTags:["MYBLOG"]
        })
        // getUsers:builder.query({
        //     query:()=>'/users'
        // })
    })
})
export const {useGetBlogsQuery,
    useGetSingleBlogQuery,
    useAddNewBlogMutation,
    useDeleteBlogMutation,
    useEditBlogMutation}=apiSlice
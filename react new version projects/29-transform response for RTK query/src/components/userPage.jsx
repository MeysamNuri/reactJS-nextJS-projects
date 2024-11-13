import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectUserById } from '../reducers/userSlice';
import { selectAllBlogs, selectUserBlogs } from '../reducers/blogSlice';
import { createSelector } from '@reduxjs/toolkit';
import { useGetBlogsQuery } from '../api/apiSlice';

const UserPage = () => {
    const { userId } = useParams()
    const userInfo = useSelector(state => selectUserById(state, userId))
    // const userBlogs=useSelector(state=>{
    //     const allBlogs=selectAllBlogs(state)
    //     return allBlogs.filter(blog=>blog.user==userId)
    // })

    // const userBlogs=useSelector(state=>selectUserBlogs(state,userId))

    const newSelectUserBlogs = useMemo(() => {
        const emptyList = [];

        return createSelector(
            res => res.data,
            (res, userId) => userId,
            //در اختیار ما هست outPut  این قسمت ورودی های این تابع هستن و خروجی ها توسط 
            (data, userId) => data?.filter((blog) => blog.user === userId) ?? emptyList
        )

    }, [])

    const {myNewWayUserBlogs}=useGetBlogsQuery(undefined,{
        selectFromResult:result=>({
            ...result,
            //چون ما نمیتونیم نتیجه رو درخواست از سرور را تغییر بدیم 
            //چون این دادها در استور ریداکس هستن و فقط میتونیم یک ابجکت برگشت بدیم
            myNewWayUserBlogs:newSelectUserBlogs(result,userId)
            //این کد به ما کمک میکنه که جلوی رندر های اضافه رو بگیریم 
           // و تنها زمانی رند انجام بشه که نیتجه یا شناسه کاربر تغییر کنه
        })
    })
    // console.log(myuserBlogs, "myuserBlogs");
    return (

        <section>
            <h2>{userInfo.fullname}</h2>

            <ul>
                {
                    myNewWayUserBlogs.length > 0 ?
                    myNewWayUserBlogs.map(blog => (
                            <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>

                        )) : <li style={{ listStyle: "none" }}>نویسنده پستی منتشر نکرده</li>}
            </ul>

        </section>
    );
}

export default UserPage;
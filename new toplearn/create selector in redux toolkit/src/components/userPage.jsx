import React from 'react';
import { Link,useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { selectUserById } from '../reducers/userSlice';
import { selectAllBlogs, selectUserBlogs } from '../reducers/blogSlice';

const UserPage = () => {
    const {userId}=useParams()
const userInfo=useSelector(state=>selectUserById(state,userId))
// const userBlogs=useSelector(state=>{
//     const allBlogs=selectAllBlogs(state)
//     return allBlogs.filter(blog=>blog.user==userId)
// })

const userBlogs=useSelector(state=>selectUserBlogs(state,userId))
    return ( 

        <section>
            <h2>{userInfo.fullname}</h2>
        
        <ul>
            {
            userBlogs.length>0?
            userBlogs.map(blog=>(
                <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
              
            ))  :<li style={{listStyle:"none"}}>نویسنده پستی منتشر نکرده</li>}
        </ul>
        
        </section>
     );
}
 
export default UserPage;
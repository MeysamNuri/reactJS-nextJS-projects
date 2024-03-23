import React from 'react';
import { useSelector } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const navigate=useNavigate()
    const blogRendered = blogs.map(blog => (
        <article className='blog-excerpt'>
            <h3>{blog.title}</h3>
            <p className='blog-content'>{blog.content.substring(0, 100)}</p>
            <Link to={`/blogs/${blog.id}`} className='button muted-button'>
            دین کامل پست
            </Link>
        </article>
    ))
    return (

        <section className='blog-list'>
            <button className='full-button accent-button' onClick={()=>navigate('/blogs/create-blog')}>ساخت پست جدید</button>
            <h3>تمامی پست ها</h3>
            {blogRendered}
        </section>
    );
}

export default BlogList;
import React from 'react';
import { useParams,Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SingleBlogPage = () => {
    const { blogId } = useParams()
    const blog = useSelector((state) => state.blogs.find((blog) => blog.id == blogId))
    if(!blog){
        return(
            <section>
                <h3>نگرد نیست !!!!!!!</h3>
            </section>
        )
    }
    return (

        <section>
            <article className='blog'>
                <h3>{blog.title}</h3>
                <p className='blog-content'>{blog.content}</p>
                <Link to={`/editBlog/${blog.id}`} className='button'>ویرایش</Link>
            </article>
        </section>
    );
}

export default SingleBlogPage;
import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchBlogs, selectAllBlogs } from "../reducers/blogSlice";
import ShowTime from "./showTime";
import ShowAuthor from "./showAuthor";
import ReactionButtons from './ReactionButtons';

const BlogsList = () => {
    const blogs = useSelector(selectAllBlogs);
    const dispatch=useDispatch()
    // const blogs = useSelector((state)=>state.newBlogs.blogsList);
    const blogStatus=useSelector(state=>state.newBlogs.status)
    const navigate = useNavigate();

    useEffect(()=>{
        if(blogStatus=="idle"){
            dispatch(fetchBlogs())
        }

    },[blogStatus])

    
    let orderedBlog=blogs?.slice().sort((a,b)=>b.date.localeCompare(a.date))
    const renderedBlogs = orderedBlog?.map((blog) => (
        <article key={blog.id} className="blog-excerpt">
            <h3>{blog.title}</h3>
            <div style={{margin:"10px 15px 0 0"}}>
                <ShowTime timeStamp={blog.date} />
                <ShowAuthor userId={blog.user} />
            </div>
            <p className="blog-content">{blog.content.substring(0, 20)}</p>
            <ReactionButtons blog={blog} />
            <Link to={`/blogs/${blog.id}`} className="button muted-button">
                دیدن کامل پست
            </Link>
        </article>
    ));

    return (
        <section className="blog-list">
            <button
                className="full-button accent-button"
                style={{
                    marginTop: "1em",
                }}
                onClick={() => navigate("/blogs/create-blog")}
            >
                ساخت پست جدید
            </button>
            <h2>تمامی پست ها</h2>
            {renderedBlogs}
        </section>
    );
};

export default BlogsList;

import { useMemo } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useGetBlogsQuery } from '../api/apiSlice'
import ShowTime from "./showTime";
import ShowAuthor from "./showAuthor";
import ReactionButtons from "./ReactionButtons";
import Spinner from "./Spinner";

const BlogsList = () => {

    const {
        data: blogs = [],
        isLoading,
        isSuccess,
        isFetching,
        isError,
        error,
        refetch
    } = useGetBlogsQuery()
    const navigate = useNavigate();

    // const error = useSelector((state) => state.error);


    const sortedBlogs = useMemo(()=>{
        const sortedList = blogs.slice().sort((a, b)=> b.date.localeCompare(a.date))
        return sortedList
}, [blogs])
let content;
if (isLoading) {
    content = <Spinner text="بارگذاری ..." />;
} else if (isSuccess) {

    content = sortedBlogs.map((blog) => (
        <article key={blog.id} className="blog-excerpt">
            <h3>{blog.title}</h3>

            <div style={{ marginTop: "10px", marginRight: "20px" }}>
                <ShowTime timeStamp={blog.date} />
                <ShowAuthor userId={blog.user} />
            </div>

            <p className="blog-content">{blog.content.substring(0, 100)}</p>

            <ReactionButtons blog={blog} />

            <Link to={`/blogs/${blog.id}`} className="button muted-button">
                دیدن کامل پست
            </Link>
        </article>
    ));
} else if (isError) {
    content = <div>{error}</div>;
}

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
        <button onClick={refetch}>بازنشانی</button>
        {content}
    </section>
);
};

export default BlogsList;

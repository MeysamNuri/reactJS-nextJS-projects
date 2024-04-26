import { useParams, Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { blogDeleted, selectBlogById, deleteApiBlog } from "../reducers/blogSlice";
import { useDeleteBlogMutation, useGetSingleBlogQuery } from '../api/apiSlice';
import ShowTime from './showTime';
import ShowAuthor from "./showAuthor";
import ReactionButtons from './ReactionButtons';
import Spinner from "./Spinner";

const SingleBlogPage = () => {
    const { blogId } = useParams();
    const {
        data: blog,
        isFetching,
        isLoading,
        isSuccess
    } = useGetSingleBlogQuery(blogId)
    // const blog = useSelector((state) => selectBlogById(state, blogId));
    const [deleteBlog] = useDeleteBlogMutation()
    const navigate = useNavigate();

    const handelDelete = async () => {
        await deleteBlog(blogId)
        navigate("/")
    }
    let content;

    if (isLoading) {
        content = <Spinner text="...در حال بارگزاری" />
    }
    else if (isSuccess) {
        content = <article className="blog">
            <h2>{blog.title}</h2>
            <ShowTime timeStamp={blog.date} />
            <ShowAuthor userId={blog.user} />
            <br />
            <p className="blog-content">{blog.content}</p>
            <ReactionButtons blog={blog} />
            <Link to={`/editBlog/${blog.id}`} className="button">
                ویرایش پست
            </Link>
            <button
                className="muted-button"
                style={{ marginRight: "10px" }}
                onClick={handelDelete}
            >
                حذف پست
            </button>
        </article>
    }
    if (!blog) {
        return (
            <section>
                <h2>پستی که دنبالش میگردی وجود نداره دوست من 🤗</h2>
            </section>
        );
    }


    return (
        <section>
            {content}
        </section>
    );
};

export default SingleBlogPage;

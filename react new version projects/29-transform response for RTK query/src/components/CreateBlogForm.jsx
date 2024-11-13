import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useAddNewBlogMutation } from '../api/apiSlice'
import { addNewBlog, blogAdded } from "../reducers/blogSlice";
import { selectAllUsers } from "../reducers/userSlice";

const CreateBlogForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const users = useSelector(selectAllUsers)
    const [addnewBlog, { isLoading }] = useAddNewBlogMutation()
    const navigate = useNavigate();

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const onUserChange = (e) => setUserId(e.target.value)
    const canSave = [title, content, userId].every(Boolean) && !isLoading;
    const handleSubmitForm = async () => {
        if (canSave) {
            try {
                await addnewBlog({
                    id: nanoid(),
                    date: new Date().toISOString(),
                    title,
                    content,
                    user: userId,
                    reactions: {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0
                    }
                }).unwrap()
                setTitle("");
                setContent("");
                navigate("/");
                setUserId("")
            } catch (error) {
                console.error("failed in server", error)
            }

        }
    };

    return (
        <section>
            <h2>ساخت پست جدید</h2>
            <form autoComplete="off">
                <label htmlFor="blogTitle">عنوان پست :</label>
                <input
                    type="text"
                    id="blogTitle"
                    name="blogTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="user"></label>
                <select
                    name="user"
                    onChange={onUserChange}
                >
                    <option>انتخاب کنید</option>
                    {
                        users.map(item => (
                            <option key={item.id} value={item.id}>{item.fullname}</option>
                        ))
                    }
                </select>
                <label htmlFor="blogContent">محتوای اصلی :</label>
                <textarea
                    id="blogContent"
                    name="blogContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button type="button" onClick={handleSubmitForm} disabled={!canSave}>
                    ذخیره پست
                </button>
            </form>
        </section>
    );
};

export default CreateBlogForm;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

import { blogAdded } from "../reducers/blogSlice";
import { selectAllUsers } from "../reducers/userSlice";

const CreateBlogForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const users = useSelector(selectAllUsers)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const onUserChange = (e) => setUserId(e.target.value)

    const canSave=[title,content,userId].every(Boolean)
    const handleSubmitForm = () => {
        if (canSave) {
            dispatch(blogAdded(title, content, userId));
            setTitle("");
            setContent("");
            navigate("/");
            setUserId("")
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
                            <option key={item.id} value={item.id}>{item.fullName}</option>
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

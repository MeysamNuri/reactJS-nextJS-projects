import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers, useAddNewUserMutation, useDeleteUSerMutation } from '../reducers/userSlice';
import { Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { useAddNewBlogMutation, useDeleteBlogMutation } from '../api/apiSlice';

const UsersList = () => {
    const users = useSelector(selectAllUsers)
    const [user, setUser] = useState()
    const [addNewApiUser]=useAddNewUserMutation()
    const [deleteUser]=useDeleteUSerMutation()
    // const dispatch = useDispatch()
    const canSave = Boolean(user)
    const handleSubmitForm = async() => {
        if (canSave) {
            await addNewApiUser({ id: nanoid(), fullname: user })
            setUser("")
        }
    }
    const handleDeleteUser =async id => {
      await deleteUser(id)
    }
    return (

        <section>
            <div>
                <form action="">
                    <label htmlFor="user">نام نویسنده</label>
                    <input type="text" name="user" id="user" value={user} onChange={e => setUser(e.target.value)} />
                    <button type='button' 
                    onClick={handleSubmitForm} 
                    disabled={!canSave}>ساخت نویسنده</button>
                </form>
            </div>
            <h2>لیست نویسندگان</h2>
            <ul>
                {
                    users.map(user => (
                        <li key={user.id}>
                            <Link to={`/users/${user.id}`}>{user.fullname}

                            </Link>
                            <span onClick={()=>handleDeleteUser(user.id)}  style={{ color: "red", cursor: "pointer" }}>&otimes;</span>
                        </li>
                    ))

                }
            </ul>
        </section>
    );
}

export default UsersList;
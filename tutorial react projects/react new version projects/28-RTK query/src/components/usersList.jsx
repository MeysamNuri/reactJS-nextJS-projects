import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers } from '../reducers/userSlice';
import { Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

const UsersList = () => {
    const users = useSelector(selectAllUsers)
    const [user, setUser] = useState()
    // const dispatch = useDispatch()
    const canSave = Boolean(user)
    // const handleSubmitForm = () => {
    //     if (canSave) {
    //         dispatch(addNewApiUser({ id: nanoid(), fullname: user }))
    //         setUser("")
    //     }
    // }
    // const handleDeleteUser = id => {
    //     dispatch(deleteApiUser(id))
    // }
    return (

        <section>
            <div>
                <form action="">
                    <label htmlFor="user">نام نویسنده</label>
                    <input type="text" name="user" id="user" value={user} onChange={e => setUser(e.target.value)} />
                    <button type='button' 
                    // onClick={handleSubmitForm} 
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
                            <span  style={{ color: "red", cursor: "pointer" }}>&otimes;</span>
                        </li>
                    ))

                }
            </ul>
        </section>
    );
}

export default UsersList;
"use client"
import React, { useEffect } from 'react';

export default function Error(error, reset) {

    useEffect(() => {
        console.log(error, "error");
    }, [error])

    return (
        <div className='container'>
            <div className='quiz-container'>
                <h2 style={{color:"black"}}>   مشکلی پیش آمد</h2>
                <button onClick={() => reset()}>دوباره تلاش کن</button>
            </div>
        </div>
    )
}
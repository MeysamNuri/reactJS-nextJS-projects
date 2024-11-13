"use client"
import { useState, useEffect } from "react";
import Count from "./counte";
import { useRouter } from 'next/navigation'

const Counter = () => {
    const [count, setCount] = useState(0)
    const router = useRouter()
    useEffect(() => {
        if (count === 5) {
            router.push("/")
            // router.back("/")
            // router.forward("/")
            // router.replace("/")
        }
    }, [count])

    return (

        <div>
            <Count count={count} setCount={setCount} />
        </div>
    );
}

export default Counter;


import Link from 'next/link'
import { notFound } from 'next/navigation'
export const getSinglePostApi = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (!res.ok) {
        if (res.status === 404)
            return notFound()
        throw new Error("somthing went wrong")


    }
    return await res.json()
}

const PsotSinglePage = async ({ params }) => {
    const { id } = params
    let post = await getSinglePostApi(id)

    return (
        <>
            <Link href={"/posts"}>
                back to post list
            </Link>
            <h1>
                {post.title}

            </h1>
            <p>   {post.body}</p>

        </>
    );
}

export default PsotSinglePage;
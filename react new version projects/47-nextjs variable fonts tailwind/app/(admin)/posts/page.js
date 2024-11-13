
import PostListComponent from "./postsList";

export const getPostApi = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")

    if (!res.ok) {
     
        throw new Error(res)
    }
    return await res.json()
}

const Posts = async () => {
    const postList = await getPostApi()
 

    return (
        <>
            <h1 className="text-red-600 underline text-center font-vazir">
              لیست پست های جدید باری فونت
            </h1>
            <PostListComponent postList={postList}/>
        </>
    );
}

export default Posts;
"use client"
import Link from "next/link";
import postStyle from './postList.module.css'
export default function PostListComponent({ postList }) {

    return (
        <div >

            {postList.map((post) => (
                <div>
                    <Link href={`/posts/${post.id}`} >
                        <h3 className="bg-red-400 text-center">titel: {post.title}</h3>
                    </Link>
                    <br />
                    <hr />
                </div>
            ))}
        </div>
    )
}
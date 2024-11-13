"use client"
import Link from "next/link";

export default function PostListComponent({ postList }) {

    return (
        <div>

            {postList.map((post) => (
                <div>
                    <Link href={`/posts/${post.id}`} >
                        <h3>titel: {post.title}</h3>
                    </Link>
                    <br />
                    <hr />
                </div>
            ))}
        </div>
    )
}

export async function generateStaticParams() {
   const posts = await fetch("https://jsonplaceholder.ir/posts").then((res) =>
       res.json()
   );

   console.log(posts);

   const final = posts.map((post) => ({
       id: String(post.id),
       userId: String(post.id),
   }));

   console.log(final);

   return final;
}
const Blog = ({ params }) => {
   console.log(params, "params");

   return (
      <>
         <h1>
            وبلاگ من

         </h1>
         <p>{`اولین پست من ${params.blog[1]}`}</p>
      </>
   );
}

export default Blog;
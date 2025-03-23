

const Blog = ({ params }) => {
   console.log(params, "params");

   return ( 
      <>
        <h1>
           وبلاگ من

        </h1>
        <p>{`اولین پست من ${params.id}`}</p>
        </>
     );
}

export default Blog;
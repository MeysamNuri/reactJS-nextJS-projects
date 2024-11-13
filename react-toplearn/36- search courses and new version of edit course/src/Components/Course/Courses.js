import React from 'react';
import {Link} from "react-router-dom"

const Courses = ({courses}) => {
    return ( 
        <section class="terms-items">
        <header>
            <h2> آخرین دوره های تاپ لرن </h2>
            <Link to="/archive"> مشاهده همه دوره ها </Link>
        </header>
        <div class="row">
            
         {courses.map(item=>(
                <div key={item._id} class="col-lg-3 col-md-4 col-sm-6 col-xs-12 term-col">
                <article>
                    <Link to={`/course/${item._id}`} class="img-layer">
                        <img src={`https://toplearnapi.ghorbany.dev/${item.imageUrl}`} /> 
                       
                        </Link>
                    <h2><Link to={`/course/${item._id}`}> {item.title} </Link></h2>
                    <span> رایگان </span>
                    <i>1:52:32</i>
                </article>
            </div>   
         )
         
         )} 
            
         
            
        </div>
    </section>
     );
}
 
export default Courses;
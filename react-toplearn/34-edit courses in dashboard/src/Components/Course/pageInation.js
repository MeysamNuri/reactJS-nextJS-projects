import React from 'react';
import {range} from 'lodash'
import { Link } from 'react-router-dom';
const Pageination = ({totalcourses,perPage,currentPage,onPageChane}) => {
    const pageCount=Math.ceil(totalcourses/perPage)
if(pageCount===1) return null
    const pages=range(1,pageCount + 1)
    return (

        <>

            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
     {pages.map(page=>(
              <li key={page} className={`${page ===currentPage?"page-item active":"page-item"}`}>
                  <a className="page-link"onClick={()=>onPageChane(page)} style={{cursor:"pointer"}}>
                      
                    {page}
                      </a></li>
     ))}
                </ul>
            </nav>
        </>
    );
}

export default Pageination;
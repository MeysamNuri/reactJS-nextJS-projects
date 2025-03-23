import React from 'react';
import { range } from 'lodash'
const Pageination = ({ totalcourses, currentPage, perpage, onpageChane }) => {

    const pagecounter = Math.ceil(totalcourses / perpage)
    if (pagecounter === 1) return null
    const pages = range(1, pagecounter + 1)

    return (

        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {pages.map(page => (
                    <li
                        key={page}
                        className={
                            page === currentPage
                                ? "page-item active"
                                : "page-item"
                        }
                    >
                            <a
                                className="page-link"
                                style={{ cursor: "pointer" }}
                                onClick={() => onpageChane(page)}
                            >
    {page}
                            </a>
                        
                        </li>
                    ))}

                </ul>
            </nav>
        
    );
}

export default Pageination;
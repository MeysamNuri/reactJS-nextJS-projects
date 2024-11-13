"use client"
import { useState } from "react";
// import LazyLoadComponent from "./lazyLoadComponent";
import dynamic from "next/dynamic";




const LazyLoadComponent=dynamic(()=>import("./lazyLoadComponent"),{ssr:false})
const About = ({ params }) => {
    console.log(params, "params");
    const [showCompnent, setShowComponent] = useState(false)
    return (
        <h1>
            dynamic about page
            {params.id}
            <button onClick={()=>setShowComponent(!showCompnent)}>toggel compnent</button>
            {
                showCompnent &&
                <LazyLoadComponent />
            }

        </h1>
    );
}

export default About;
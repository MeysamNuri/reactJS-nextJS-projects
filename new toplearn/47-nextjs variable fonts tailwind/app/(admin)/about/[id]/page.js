
export const metadata={
    title:{
        default:"درباره ما",
      absolute:"درباره ما"
    }
}

// export function generateMetadata({params,searchParams}){
//     console.log(searchParams,"searchParams");
//     console.log(params,"params");
//     return {
//         title:searchParams.name
//     }

// }

const About = ({params}) => {
    console.log(params,"params");
    
    return ( 
        <h1>
            dynamic about page
            {params.id}
        </h1>
     );
}
 
export default About;
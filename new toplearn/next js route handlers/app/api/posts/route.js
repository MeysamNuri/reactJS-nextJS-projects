export async function GET(){
    const res=await fetch("https://jsonplaceholder.typicode.com/posts",{
        next:{revalidate:60},
        method:"GET",
        headers:{
            'Content-Type':"aplication/json"
        }
    })
    const data=await res.json()
    console.log(data);

    return Response.json({data})

}
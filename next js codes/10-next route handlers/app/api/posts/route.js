export async function GET() {
    
    const res=await fetch("https://jsonplaceholder.ir/posts",{
        next:{revalidate:60}, // revalidate post every 60 sec
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data=await res.json()
    return Response.json(data)
}
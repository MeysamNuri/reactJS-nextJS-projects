export async function GET(request) {
    console.log(request,"request");
    
    return new Response("hellow world: new api route")
    
}
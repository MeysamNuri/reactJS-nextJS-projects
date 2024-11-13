export async function GET(request){
const mysearchParams=request.nextUrl.searchParams
const newQuery=mysearchParams.get("toplearn")

return new Response(`hi new query is : ${newQuery}`,{status:200})
}
export async function GET(requset,{params}){
    const user=params.user
    console.log(user,"user");
    return new Response(`heloow new user ${user}`)
}
  

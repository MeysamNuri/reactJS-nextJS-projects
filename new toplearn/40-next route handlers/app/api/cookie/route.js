import {cookies} from 'next/headers'

export async function GET() {
    const cookiestore=cookies()
    const token=cookiestore.get("token")

    return new Response(`hi new token in : ${token&& token.value}`,{
        status:200,
        headers:{"Set-Cookie":`token=${token}`},
    })

    
}
import {cookies} from 'next/headers'

export async function GET(){
    const cookieStore=cookies()

    const token=cookieStore.get("token")

    return new Response(`hellow new cookie is: toketn -> ${token?.value}`,{
        status:200,
        headers:{
            "Set-Cookie":`token=${token}`
        }
    })
}
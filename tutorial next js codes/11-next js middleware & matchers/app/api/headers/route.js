import {headers} from 'next/headers'

export async function GET(request){
    const userHeaders=headers(request)
    const header=userHeaders.get("Contetn-Type")
    return new Response(`Content-Type header: ${header}`,{
        status:200,
        headers:{
            "Contetn-Type":header
        }
    })

}
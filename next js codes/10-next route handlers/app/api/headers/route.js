import { headers } from 'next/headers'

export async function GET(request) {
    const useHeaders = headers(request)
    const contetnType = useHeaders.get("Contetn-Type")
    return new Response(`content-type: ${contetnType}`,{
        status:200,
        headers:{
            "Content-Type": contetnType,
        }
    })
}
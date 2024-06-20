//export async function GET(request) {}
//export async function PUT(request) {}
//export async function POST(request) {}
//export async function DELETE(request) {}
export async function GET(request){
    console.log(request,"requst");
    return new Response("hellow world: new api route....")
}
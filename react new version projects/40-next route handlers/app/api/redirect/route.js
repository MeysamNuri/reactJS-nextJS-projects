import {redirect} from 'next/navigation'
const fullname = "meysam";
export async function GET() {
    
redirect(`http://localhost:3000/api/username/`)
}



import {redirect} from 'next/navigation'
let fullName="meysam-nuri"

export async function GET(){
    redirect(`http://localhost:3000/api/username/${fullName}`)
}
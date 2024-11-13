const { sources } = require('next/dist/compiled/webpack/webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects(){
        return[
            {
                source:"/series",
                destination:"/about",
                permanent:true
            }
        ]
    }
}

module.exports = nextConfig

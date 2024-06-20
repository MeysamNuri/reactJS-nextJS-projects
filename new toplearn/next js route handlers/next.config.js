/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"roozaneh.net",
                // port:"",
                // pathname: "/img/course/**",
            }
        ]
    }
}

module.exports = nextConfig

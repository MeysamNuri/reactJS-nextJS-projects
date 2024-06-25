/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ghorbany.dev",
                port: "",
                pathname: "/static/media/**",
            },
        ],
    },
};

module.exports = nextConfig;

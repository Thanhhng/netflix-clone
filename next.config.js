/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname: "upload.wikimedia.org"
            },
            {
                protocol:"https",
                hostname:"mango.blender.org"
            },
            {
                protocol: "http",
                hostname: "uhdtv.io",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "download.blender.org",
            },
        ]
    }
}

module.exports = nextConfig

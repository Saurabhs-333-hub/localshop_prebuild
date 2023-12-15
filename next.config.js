/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/appwrite/:path*',
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ],
                // destination: 'https://localshop-prebuild.vercel.app/:path*'
            }
        ]
    },

    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: 'http://localhost:4000/:path*'
    //         }
    //     ]
    // }    
}

module.exports = nextConfig

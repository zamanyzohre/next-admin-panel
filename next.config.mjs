/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images:{
        remotePatterns:[
            {
                // protocol:`${process.env.API_PROTOCOL}`,
                protocol:'http',
               hostname:`${process.env.API_HOSTNAME}`
            }
        ]
    }
};

export default nextConfig;

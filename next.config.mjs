/** @type {import('next').NextConfig} */
const nextConfig = {
   // images: {
   //    domains: ["i.ibb.co"]
      
   //  },
   images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.ibb.co',
          port: '',
         //  pathname: '/my-bucket/**',
        },
      ],
    },
};

export default nextConfig;

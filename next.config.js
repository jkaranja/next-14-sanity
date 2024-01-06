/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com", 
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io", 
      },
    ],
    //domains: ["res.cloudinary.com", "cdn.pixabay.com"], //deprecated
  },
};

module.exports = nextConfig;

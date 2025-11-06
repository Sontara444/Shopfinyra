/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "via.placeholder.com",
      "static.vecteezy.com",
      "res.cloudinary.com",
      "id-preview--c2a2397b-e5f8-49f1-8e18-fd1b5dc284c9.lovable.app", // ✅ only domain name
    ],
  },
};

module.exports = nextConfig;

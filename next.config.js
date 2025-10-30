/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "plus.unsplash.com", // ✅ Add this line
      "tse2.mm.bing.net",
      "th.bing.com",
      "r2imghtlak.mmtcdn.com",
    ],
  },
};

module.exports = nextConfig;

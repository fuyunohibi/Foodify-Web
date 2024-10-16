/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // This disables all restrictions on image optimization
    // output: 'standalone',
  },
};

export default nextConfig; // Use export instead of module.exports

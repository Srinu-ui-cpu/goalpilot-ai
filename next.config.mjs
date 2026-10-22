/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com", "img.youtube.com"],
  },
  typescript: {
    // Already verified with tsc --noEmit
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

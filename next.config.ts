// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

//** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'covers.openlibrary.org', 'images.ctfassets.net'], // Add allowed external image domains here
  },
};

module.exports = nextConfig;


// ** @type {import('next').NextConfig} **
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com',
      'covers.openlibrary.org',
      'images.ctfassets.net',
      'embed.filekitcdn.com' // Added this domain
    ],
  },
};

module.exports = nextConfig;

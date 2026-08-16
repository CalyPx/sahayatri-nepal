/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig = {
  experimental: {
    // Default is 1MB — too small for photo/PDF uploads through Server Actions.
    serverActions: { bodySizeLimit: "10mb" },
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

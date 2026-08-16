/** @type {import('next').NextConfig} */
const remotePatterns = [];

if (process.env.R2_PUBLIC_URL) {
  const url = new URL(process.env.R2_PUBLIC_URL);
  remotePatterns.push({
    protocol: url.protocol.replace(":", ""),
    hostname: url.hostname,
  });
}

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig = {
  images: { remotePatterns },
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

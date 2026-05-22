import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  allowedDevOrigins: [
    "192.168.5.100",
  ],
}

export default nextConfig

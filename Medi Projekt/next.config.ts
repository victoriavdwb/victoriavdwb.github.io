import type { NextConfig } from "next";

// Auf GitHub Pages liegt die Seite unter /<repo-name>/ – der Pfad kommt aus der CI.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;

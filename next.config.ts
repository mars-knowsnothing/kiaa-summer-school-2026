import path from "node:path";
import {fileURLToPath} from "node:url";
import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.resolve(configDir),
  reactStrictMode: true,
  serverActions: {
    bodySizeLimit: "20mb"
  }
};

export default withNextIntl(nextConfig);

/** @type {import('next').NextConfig} */

// اسم مستودعك على GitHub (يجب أن يطابق اسم الـrepo بالضبط)
const repo = "tasharak";

// في التطوير المحلي: بدون basePath — على GitHub Pages: مع basePath
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd && repo ? "/" + repo : "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;

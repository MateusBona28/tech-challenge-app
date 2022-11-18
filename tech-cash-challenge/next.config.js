/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SECRET_KEY: "a42ab840f32b7f5d77245f6167456806"
  }
}

module.exports = nextConfig

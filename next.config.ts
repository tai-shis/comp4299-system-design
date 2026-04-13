import createMDX from '@next/mdx';
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} **/
const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);

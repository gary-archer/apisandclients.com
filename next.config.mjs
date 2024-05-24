import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm'
import remarkPrism from 'remark-prism'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: false,
    pageExtensions: ['tsx', 'mdx'],
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true,
    },
};

const mdxConfig = {
    options: {
        remarkPlugins: [remarkGfm, remarkPrism],
    },
};

export default withMDX(mdxConfig)(nextConfig);
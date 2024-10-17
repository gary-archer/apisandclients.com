import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm-no-autolink';
import remarkPrism from 'remark-prism'
import rehypeSlug from 'rehype-slug';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['tsx'],
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true,
    },
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/posts/home',
                permanent: true,
            },
        ];
    },
};

const mdxConfig = {
    options: {
        remarkPlugins: [remarkGfm, remarkPrism],
        rehypePlugins: [rehypeSlug],
    },
};

export default withMDX(mdxConfig)(nextConfig);

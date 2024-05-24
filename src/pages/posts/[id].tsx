import fs from 'fs-extra';
import {GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult} from 'next';
import path from 'path';
import {ClientView} from '../../views/clientview';
import {PostProps} from '../../utilities/postProps';

/*
 * Return the IDs of all blog posts when 'next build' is run
 */
export async function getStaticPaths(): Promise<GetStaticPathsResult> {

    const postsDirectory = path.join(process.cwd(), 'posts');
    const mdxFiles = await fs.readdir(postsDirectory);
    const paths = mdxFiles.map((filename) => ({
        params: {
            id: filename.replace(/\.mdx$/, ''),
        }
    }));

    return {
        paths,
        fallback: false,
    };
}

/*
 * Return details for the current page when 'next build' is run
 */
export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PostProps>> {
  
    const id = context.params.id as string;
    return {
        props: {
            filename: id,
        },
    };
}

/*
 * Run the client view for the current page
 */
export default function Post(props: PostProps): JSX.Element {

    return (
        <ClientView {...props} />
    );
}

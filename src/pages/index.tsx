import {GetStaticPropsResult} from 'next';
import {PostView} from '../views/postView';
import {PostViewProps} from '../views/postViewProps';

/*
 * Return details for the blog's home page when 'next build' is run
 */
export async function getStaticProps(): Promise<GetStaticPropsResult<PostViewProps>> {

    return {
        props: {
            filename: 'home',
        },
    };
}

/*
 * Run the client view when requested
 */
export default function Home(props: PostViewProps): JSX.Element {

    return (
        <PostView {...props} />
    );
}

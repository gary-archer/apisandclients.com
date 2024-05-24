import {GetStaticPropsResult} from 'next';
import {PostProps} from '../utilities/postProps';
import {ClientView} from '../views/clientview';

/*
 * Return details for the blog's home page when 'next build' is run
 */
export async function getStaticProps(): Promise<GetStaticPropsResult<PostProps>> {

    return {
        props: {
            filename: 'home',
        },
    };
}

/*
 * Run the client view when requested
 */
export default function Home(props: PostProps): JSX.Element {

    return (
        <ClientView {...props} />
    );
}

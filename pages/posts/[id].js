import Head from 'next/head';
import Layout from '../../components/layout';
import {getAllPostIds, getPostData} from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

/*
 * Return props for the runtime page ID
 */
export async function getStaticProps({ params }) {

  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

/*
 * Control pages generated during the build
 */
export async function getStaticPaths() {

  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

/*
 * Render a post given its data
 */
export default function Post( { postData } ) {
  
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
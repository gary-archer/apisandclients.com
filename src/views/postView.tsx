import {MDXProvider} from '@mdx-js/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router'
import {useEffect, useRef, useState} from 'react';
import {addCopyToClipboardButtons} from '../utilities/codeProcessor';
import {updateMdxLinks} from '../utilities/linkProcessor';
import {PostViewProps} from './postViewProps';
import {NavBar} from './navBar';

/*
 * The main client side view
 */
export function PostView(props: PostViewProps): JSX.Element {

    const rootRef = useRef<HTMLDivElement>(null);
    const scrollPositions = useRef<{[file: string]: number}>({});
    const router = useRouter();
    let [showNavBar, setShowNavBar] = useState(false);

    useEffect(() => {
        startup();
        return () => cleanup();
    }, [props.filename]);

    /*
     * Run startup logic
     */
    async function startup() {

        setShowNavBar(false);
        router.events.on('routeChangeStart', storeScrollPos);

        if (location.pathname === '/') {
            location.href += 'posts/home';
        }
    }

    /*
     * Unsubscribe from events
     */
    function cleanup() {
        router.events.off('routeChangeStart', storeScrollPos);
    }


    /*
     * Store the scroll position when moving to a new page
     */
    function storeScrollPos() {
        scrollPositions.current[props.filename] = window.scrollY;
    };

    /*
     * Restore the scroll position when a page loads
     */
    function restoreScrollPos() {

        if (scrollPositions.current[props.filename]) {
            
            // Use a saved scroll position if available
            window.scroll({
                top: scrollPositions.current[props.filename],
                behavior: 'auto',
            });
        }
        else {

            // Otherwise, return to a bookmarked section within the page if there is a hash fragment
            // On initial page load, content is not hydrated so we must scroll after content is rendered
            if (typeof window !== 'undefined' && window.location.hash) {

                document
                    .querySelector(window.location.hash)
                    .scrollIntoView({ behavior: 'instant' });
            }
        }
    }

    /*
     * Run some operations once a page has rendered
     */
    function onRendered() {

        // Show the navbar
        setShowNavBar(true);

        // Render copy buttons for prism code snippets
        addCopyToClipboardButtons(rootRef);

        // Remove the .mdx suffix from <a> tags
        updateMdxLinks(rootRef);

        // Restore the previous scroll position
        restoreScrollPos();
    }

    /*
     * Load MDX, allow 50 milliseconds for it to render, then run post rendering logic
     */
    const MdxContent = dynamic(() => import(`../../public/posts/${props.filename}.mdx`).then((result) => {
        setTimeout(onRendered, 50);
        return result;
    }));

    /*
     * Render H3 subheadings in posts as links
     */
    const subheadingLink = ({id, ...rest}) => {
        
        if (id) {
            return (
                <a href={`#${id}`}>
                    <h3 id={`${id}`} {...rest} />
                </a>
            );
        }

        return <h3 {...rest} />;
    };

    /*
     * Render the page
     */
    const siteTitle = 'OAuth Development Setups';
    return (
        <div ref={rootRef} className='container'>
            <Head>
                <meta name='description' content={siteTitle} />
                <title>{siteTitle}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <header>
                <h2>
                    <a href='home.mdx'>{siteTitle}</a>
                </h2>
                <p className='subHeadingText'>Designs and Code Samples</p>
            </header>
            <main>
                <article className='article'>
                    <MDXProvider components={{h3: subheadingLink}}>
                        <MdxContent />
                    </MDXProvider>
                    {showNavBar && <NavBar />}
                </article>
            </main>
        </div>
    );
}

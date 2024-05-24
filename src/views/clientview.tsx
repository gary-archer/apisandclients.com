import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router'
import {useEffect, useRef, useState} from 'react';
import {addCopyToClipboardButtons} from '../utilities/codeProcessor';
import {PostProps} from '../utilities/postProps';
import Navbar from './navbar';

/*
 * The main client side view
 */
export function ClientView(props: PostProps): JSX.Element {

    const rootRef = useRef<HTMLDivElement>(null);
    const scrollPositions = useRef<{[file: string]: number}>({});
    const router = useRouter();
    let [showNavBar, setShowNavBar] = useState(false);

    useEffect(() => {
        startup();
        return () => cleanup();
    }, [props.filename]);

    /*
     * Set initial state and subscribe to events
     */
    async function startup() {
        setShowNavBar(false);
        router.events.on('routeChangeStart', storeScrollPos);
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
            window.scroll({
                top: scrollPositions.current[props.filename],
                behavior: 'auto',
            });
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

        // Restore the previous scroll position
        restoreScrollPos();
    }

    /*
     * Load MDX, allow 50 milliseconds for it to render, then run post rendering logic
     */
    const MdxContent = dynamic(() => import(`../../posts/${props.filename}.mdx`).then((result) => {
        setTimeout(onRendered, 50);
        return result;
    }));

    /*
     * Render the page
     */
    const siteTitle = 'APIs and Clients End-to-End';
    return (
        <div ref={rootRef} className='container'>
            <Head>
                <meta name='description' content={siteTitle} />
                <title>{siteTitle}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <header>
                <h2>
                    <Link href='/'>{siteTitle}</Link>
                </h2>
                <p className='subHeadingText'>Designs and Code Samples</p>
            </header>
            <main>
                <article className='article'>
                    <MdxContent />
                    {showNavBar && <Navbar />}
                </article>
            </main>
        </div>
    );
}

import type {AppProps} from 'next/app'
import '../../public/styles/app.css';
import 'prismjs/themes/prism-tomorrow.css';

/*
 * Creates a custom application and imports global styles
 */
export default function App({Component, pageProps}: AppProps): JSX.Element {
    return <Component {...pageProps} />;
}

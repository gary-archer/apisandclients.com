import Link from 'next/link';

/*
 * The client side navbar is rendered to the top right in wide views or after other content in mobile views
 */
export function NavBar(): JSX.Element {
  
    return (
        <div className='navbar'> 
            <div className='navbarHeader'>
                <h3>Links</h3>
            </div>
            <ul>
                <div>
                    <li><a href='index.mdx'>Main Index</a></li>
                </div>
                <div>
                    <li><a href='quick-start.mdx'>Code Samples</a></li>
                </div>
                <div>
                    <li><a href='about.mdx'>About</a></li>
                </div>
            </ul>
        </div>
    );
}

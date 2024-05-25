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
                    <li><Link href='/posts/index'>Main Index</Link></li>
                </div>
                <div>
                    <li><Link href='/posts/quick-start'>Code Samples</Link></li>
                </div>
                <div>
                    <li><Link href='/posts/about'>About</Link></li>
                </div>
            </ul>
        </div>
    );
}

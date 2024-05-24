import type {MDXComponents} from 'mdx/types'
import Link from 'next/link'
 
/*
 * Allow the Link type to be used in MDX pages, to enable client-side navigation
 */ 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  
    return {
        Link,
        ...components,
    };
}
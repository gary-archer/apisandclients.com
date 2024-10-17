import {MutableRefObject} from 'react';

/*
 * By default I use <a> tags that link to physical MDX files.
 * This ensures that links work when viewed in the GitHub repository.
 * When running in NEXT.js, this routine dynamically strips the .mdx suffix.
 * The result is that NEXT.js navigation works as expected.
 */
export function updateMdxLinks(rootRef: MutableRefObject<HTMLDivElement>): void {

    const allAnchors = rootRef.current?.querySelectorAll<HTMLAnchorElement>('a');
    if (allAnchors) {
        allAnchors.forEach((anchor: HTMLAnchorElement) => {
            anchor.href = anchor.href.replace('.mdx', '');
        });
    }
}

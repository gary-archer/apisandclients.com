import {MutableRefObject} from 'react';

/*
 * Add a copy to clipboard button to each markdown code block after it has been rendered by remark-prism
 * https://css-tricks.com/syntax-highlighting-prism-on-a-next-js-site
 */
export function addCopyToClipboardButtons(rootRef: MutableRefObject<HTMLDivElement>): void {

    const allPres = rootRef.current?.querySelectorAll<HTMLPreElement>('pre');
    if (allPres) {
        allPres.forEach((pre: HTMLPreElement) => {

            const code = pre.firstElementChild;
            if (code && /code/i.test(code.tagName)) {
                pre.appendChild(createCopyButton(code));
            }
        });
    }
}

/*
 * Create a single copy button element and define its click behaviour
 */
function createCopyButton(codeElement: Element): HTMLButtonElement {

    const button = document.createElement('button');
    button.classList.add('prism-copy-button');
    button.textContent = 'Copy';
  
    button.addEventListener('click', () => {

        if (button.textContent === 'Copied') {
            return;
        }

        navigator.clipboard.writeText(codeElement.textContent || "");
        button.textContent = 'Copied';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Copy';
            button.disabled = false;
        }, 1000);
    });
  
    return button;
}

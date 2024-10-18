# Final Blog Cloudfront Logic

The Cloudfront distribution now just redirects unless the robots.txt file is requested.

## Viewer Request Function

```javascript
const targetHost = 'https://github.com/gary-archer/oauth.blog/tree/master/public';

function handler(event) {

    const request = event.request;
    const requestPath = request.uri.toLowerCase();
    
    const isPageRequest = !requestPath.match(/^.*(\.txt)$/);
    if (isPageRequest) {
    
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': {
                    value: getTargetUrl(requestPath),
                },
            },
        };
    }

    return request;
}

function getTargetUrl(rawRequestPath) {

    const requestPath = rawRequestPath.replace(/\/+$/, '');
    if (!requestPath) {
        return `${targetHost}/posts/home`;
    }

    return `${targetHost}${requestPath}.mdx`;
}
```

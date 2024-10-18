# Updated Blog Cloudfront Logic

The Cloudfront distribution for the updated blog URL uses the following logic.

## Distribution Settings

- Compression is enabled for HTTP responses
- A `Response Header Policy` sets security headers including a Content Security Policy
- A Custom Error Page is used for invalid routes, which renders the root path

## Viewer Request Function

This adds HTML suffixes for NEXT.js routes:

```javascript
function handler(event) {
    
    const request = event.request;
    const requestPath = request.uri.toLowerCase();

    const isPageRequest = !requestPath.match(/^.*(\.jpg|\.ico|\.js|\.json)$/);
    if (isPageRequest) {
        request.uri = `${requestPath}.html`;
    }

    return request;
}
```

## Viewer Response Function

This sets cache-control headers for images:

```javascript
function handler(event) {

    const request = event.request;
    const requestUri = request.uri.toLowerCase();
    const response = event.response;
    const headers = response.headers;

    const isCacheable = requestUri.match(/^.*(\.jpg|\.ico)$/);
    if (isCacheable) {
        
        headers["cache-control"] = {
            value: "public, max-age=31536000, immutable",
        };
    }

    return response;
}
```

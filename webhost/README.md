# Web Host

I use Express to simulate HTTP server behaviour locally.

## AWS CloudFront

My real deployment uses AWS CloudFront with the same behaviours as Express:

- Compression is enabled for HTTP responses
- A `Response Header Policy` sets security headers including a Content Security Policy
- A Custom Error Page is used for invalid routes, which renders the root path
- A CloudFront viewer request function adds HTML suffixes for NEXT.js routes
- A CloudFront viewer response function sets cache-control headers for images

### Viewer Request Function

```javascript
function handler(event) {
    
    const request = event.request;
    const requestUri = request.uri.toLowerCase();

    const isPageRequest = !requestUri.match(/^.*(\.jpg|\.ico|\.js|\.json)$/);
    if (isPageRequest && requestUri.startsWith('/posts/')) {
        request.uri = `${requestUri}.html`;
    }

    return request;
}
```

### Viewer Response Function

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

# Web Host

The blog is deployed as web static content, for the most portable hosting.\
I use Express locally, as a web static content host for testing.

## AWS CloudFront

The blog's real deployment is to the AWS CloudFront content delivery network.\
CloudFront  uses the same web host logic as Express:

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
    if (isPageRequest) {

        if (!requestUri.startsWith('/posts/')) {

            return {
                statusCode: 301,
                statusDescription: 'Moved Permanently',
                headers: {
                    'location': {
                        value: '/posts/home',
                    },
                },
            };
        }

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

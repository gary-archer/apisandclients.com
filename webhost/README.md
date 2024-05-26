# Web Host

I use Express to simulate HTTP server behaviour locally.

## AWS CloudFront

My real deployment uses AWS CloudFront with the same behaviours as Express:

- HTTP Compression
- A `Response Header Policy` that sets security headers including a Content Security Policy
- A [CloudFront function](https://lucvandonkersgoed.com/2021/12/26/cache-control-with-cloudfront-functions) to handle `Not Found` paths and set cache-control headers for images

```javascript
function handler(event) {
    
    const request = event.request;
    const response = event.response;
    const headers = response.headers;

    const classifyFile = () => {

        if (request.uri.match(/^.*(\.jpg|\.ico)$/)) {

            return 'cacheable';

        } else if (request.uri.match(/^.*(\.js|\.json)$/)) {
            
            return 'noncacheable';

        } else {

            return 'page';
        }
    }
    
    const type = classifyFile();
    if (type === 'page' && response.statusCode === 403) {

        return {
            statusCode: 302,
            statusDescription: "Found",
            headers: {
                'location': {
                    value: '/',
                },
            },
        };
    }

    if (type === 'cacheable') {
        
        headers["cache-control"] = {
            value: "public, max-age=31536000, immutable",
        };
    }

    return response;
}
```

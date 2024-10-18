import compression from 'compression';
import express from 'express';
import fs from 'fs';

/*
 * Create the express app
 */
const expressApp = express();
expressApp.use(compression())

const port = 3001;
const physicalRoot = '../dist';

/*
 * Classify requests based on the file type
 */
function classifyFile(request, response) {

    const path = request.originalUrl.toLowerCase();

    const cacheableExtension = ['.jpg', '.ico'].find((ext) => {
        return path.indexOf(`${ext}`) !== -1;
    });

    const noncacheableExtension = ['.js', '.json'].find((ext) => {
        return path.indexOf(`${ext}`) !== -1;
    });
    
    if (cacheableExtension) {

        response.locals.type = 'cacheable';

    } else if (noncacheableExtension) {

        response.locals.type = 'noncacheable';

    } else {

        response.locals.type = 'page';
    }
}

/*
 * Add response headers for security and caching
 */
expressApp.use('/*', (request, response, next) => {

    classifyFile(request, response);

    let policy = "default-src 'none';";
    policy += " script-src 'self';";
    policy += " connect-src 'self';";
    policy += " child-src 'self';";
    policy += " img-src 'self';";
    policy += " style-src 'self';";
    policy += " object-src 'none';";
    policy += " frame-ancestors 'none';";
    policy += " base-uri 'self';";
    policy += " form-action 'self'";

    response.setHeader('content-security-policy', policy);
    response.setHeader('strict-transport-security', 'max-age=31536000; includeSubdomains; preload');
    response.setHeader('x-frame-options', 'DENY');
    response.setHeader('x-xss-protection', '1; mode=block');
    response.setHeader('x-content-type-options', 'nosniff');
    response.setHeader('referrer-policy', 'same-origin');

    if (response.locals.type === 'cacheable') {
        response.setHeader('cache-control', 'public, max-age=31536000, immutable');
    }

    next();
});

/*
 * Serve static content
 */
expressApp.use('/', express.static(physicalRoot));

/*
 * Tell Express how to handle requests for HTML files, where a .html extension is not specified
 */
expressApp.get('*', (request, response) => {

    if (response.locals.type === 'page') {

        const requestPath = request.path.toLowerCase();
        if (fs.existsSync(`${physicalRoot}${requestPath}.html`)) {

            // Serve HTML files within the posts folder
            response.sendFile(`${requestPath}.html`, {root: physicalRoot});

        } else {

            // For other paths, redirect to the home path
            response.redirect('/posts/home');
        }
    }
});

/*
 * Start listening
 */
expressApp.listen(port, () => {
    console.log(`Web Host is listening on HTTP port ${port}`);
});

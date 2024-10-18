# Original Blog Cloudfront Logic

The Cloudfront distribution for the original blog URL uses the following logic.

## Viewer Request Function

This redirects historical blog post URLs to a location within my GitHub repos.

```javascript
const targetHost = 'https://github.com/gary-archer/oauth.blog/tree/master/public';

const renames = {
    '/2017/09/08/goal-1-requirements': 'web-architecture-goals',
    '/2019/09/15/developer-domain-setup': 'oauth-infrastructure-setup',
    '/2018/05/23/typescript-technology-setup': 'web-technology-setup',
    '/2017/10/03/api-tokens-claims': 'api-authorization-design',
    '/2020/05/23/federation-logins': 'federated-logins',
    '/2017/12/01/azure-ad-spa-code-sample': 'azure-ad-troubleshooting',
    '/2019/04/07/local-ui-setup': 'final-spa-overview',
    '/2017/10/08/corporate-code-sample-core-behavior': 'api-journey-client-side',
    '/2017/10/08/coded-non-functional-requirements': 'api-journey-client-side',
    '/2018/01/06/net-core-oauth-coding': 'netcore-api-oauth-integration',
    '/2019/03/24/java-spring-boot-api-oauth-coding': 'spring-boot-api-oauth-integration',
    '/2019/03/25/spring-boot-api-framework-coding-model': 'spring-boot-api-coding-model',
    '/2019/08/02/api-load-test': 'api-automated-tests',
    '/2019/08/02/intelligent-api-platform-analysis': 'api-technical-support-analysis',
    '/2018/01/10/goal-2-mobile-high-level-requirements': 'native-architecture-goals',
    '/2018/01/10/mobile-architecture-goals': 'native-architecture-goals',
    '/2018/02/19/mobile-strategy': 'native-architecture-goals',
    '/2018/02/19/mobile-technology-choices': 'native-architecture-goals',
    '/2018/12/02/aws-cognito-authorization-server-setup': 'managed-authorization-server-setup',
    '/2018/12/02/spa-content-deployment': 'cdn-static-content-delivery',
    '/2018/12/23/cloud-api-key-technical-points': 'serverless-api-coding-model',
};

function handler(event) {
    
    const request = event.request;
    const requestPath = request.uri.toLowerCase();
    
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

function getTargetUrl(rawRequestPath) {

    const requestPath = rawRequestPath.replace(/\/+$/, '');
    if (!requestPath) {
        return `${targetHost}/posts/home`;
    }

    let targetPath = renames[requestPath];
    if (targetPath) {

        targetPath = `/posts/${targetPath}`;

    } else if (requestPath.startsWith('/2')) {

        const parts = requestPath.split('/');
        if (parts.length === 5) {
            targetPath = `/posts/${parts[4]}`;
        } else {
            return targetHost;
        }

    } else {

        targetPath = `/posts${requestPath}`;
    }

    return `${targetHost}${targetPath}.mdx`;
}
```

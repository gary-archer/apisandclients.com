# APIs and Clients

The content for my blog at https://apisandclients.com.

## Running the Blog

| Command | Description |
| ------- | ----------- |
| npm install | First install dependencies |
| npm start | Run in development mode with a browser at http://localhost:3000 which takes a couple of minutes to be ready |
| ./deploy-local.sh | Run in deployed mode locally using http://localhost:3001 |
| ./deploy-aws.sh | I use this script to deploy static content to AWS Cloudfront |

## Blog Architecture

The blog is primarily written using markdown and has minimal JavaScript logic:

- The folder layout and processing of markdown is explained in [Next.js Tutorials](https://nextjs.org/learn-pages-router/basics/data-fetching/blog-data).
- I then updated to [MDX](https://nextjs.org/docs/pages/building-your-application/configuring/mdx) to enable client side navigation via `Link` elements.
- The static content is then distributed globally using a [content delivery network](https://authguidance.com/cdn-static-content-delivery)
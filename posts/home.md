---
title: 'Overview'
---

This blog is a deep dive into getting started with OAuth security in APIs, browser based apps and mobile apps. The focus is primarily about taming the distributed architecture. This includes getting integrated, ensuring productive developer setups and solid end-to-end reliability. First though, let’s set the scene in terms of related business goals and requirements.

### Company Software Platforms

Software companies often want to build interactive web and API solutions, to enable a modern and dynamic user experience. It is common to therefore want to build **Secured Single Page Applications (SPA)**, with a technical focus on front end development:

![spa-and-apis](/images/1/spa-and-apis.jpg)

Later the company will add mobile apps, and the same APIs are also used by those clients. All of this seems straightforward, but end-to-end web and mobile security flows both have some challenges before the solution is production-ready.

![web-and-mobile](/images/1/web-and-mobile.jpg)

### API Foundations

Before most APIs and clients can be run in production, they need foundations. An essential one is usually security, to authenticate users and authorize access to data. The overall solution should also have a number of technical qualities:

| Quality | Description |
| ------- | ----------- | 
| <span style='color:green'>**Secure**</span> | Dealing with user authentication and API message credentials, to secure access to data |
| <span style='color:green'>**Reliable**</span> | Ensuring that the moving parts of the overall implementation provide a reliable solution |
| <span style='color:green'>**Productive**</span> | The setup should be understood by engineering teams and should not have adverse effects on how they run their components |
| <span style='color:green'>**Scalable**</span> | It must be possible to extend the architecture to many components, without a major increase in complexity |

### The OAuth 2.0 Authorization Framework

To enable future-proof security, this blog will use OAuth 2.0 to secure APIs and clients. OAuth is a [family of specifications](https://datatracker.ietf.org/doc/html/rfc6749) for protecting data. Solutions are JSON based and work well in all web, mobile and API technologies. OAuth scales well across many components in a software platform.

OAuth has become the modern security solution for normal apps and APIs, with best capabilities. It is also the standard solution for protecting high worth data, via stricter OAuth security profiles. Once OAuth is coded, the security behaviour in apps can usually be extended with zero code changes.

Yet I have often seen people struggle to implement OAuth and realise its benefits, since it is a distributed architecture with many moving parts. You now need to manage an intricate new component called the Authorization Server. You also need to make design choices that require insight, at both an architecture level and a code level.

### Blog Goals

This blog first shows developers how to get secure end-to-end API and client flows working. This blog’s security covers only the mainstream options of consuming JWT access tokens in APIs and externalizing user authentication from clients by running an OpenID Connect code flow. It then dives deeper to explain some lessons I’ve learned related to resilient API and client journeys:

- Designing for <span style='color:green'>**manageability**</span> to avoid pain points
- Coding with <span style='color:green'>**portability**</span> to keep future options open
- Ensuring <span style='color:green'>**reliability**</span> by rehearsing failure scenarios
- Enabling <span style='color:green'>**productivity**</span> by also considering developer setups

### Code Samples

This blog is code-centric with a focus on simple code, where security and other plumbing is separated from business logic. There are a number of [Standards Based Code Samples](https://github.com/gary-archer) which I use to stay up to date with mainstream technology stacks.

![repos](/images/1/repos.jpg)

The samples cover a journey that starts with ensuring a good developer setup. Next, OAuth is used to secure each app and API. Finally, reliability conditions are dealt with, as would be needed in any production system.

Any reader can run the code samples as working solutions and borrow ideas from the code. By default they point to my lost cost cloud authorization server, or they can be repointed to your own.

### Where Are We?

We have summarized blog goals and the first objective will be to deliver an initial SPA and API code sample. Both of these components will interact with an authorization server.

### Next

- Before getting started coding we will summarize some [Web Architecture Goals](/posts/web-architecture-goals)
- For a list of all blog posts see the [Index Page](/posts/index)

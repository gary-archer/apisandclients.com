---
title: 'Basic SPA – How to Run the Sample'
number: 30
---

The Overview Page summarised the behaviour of the initial [SPA and API code sample](/posts/basicspa-overview). Next we will get it running on a Developer PC, then visually describe the important OAuth related behaviour.

### Prerequisites

This blog’s code examples run in any Linux based terminal, and are tested on Ubuntu, Windows and macOS. On Windows it is expected that a [Git Bash](https://gitforwindows.org/) shell is used. Also ensure that an up to date version of [Node.js](https://nodejs.org/en/download/) is installed for your operating system.

### Step 1: Download Code from GitHub

The project is available here, consisting of a UI and API component. It can be downloaded / cloned to your local PC with this command:

```bash
git clone https://github.com/gary-archer/oauth.websample1
```

![Repo](/images/20/repo.jpg)

### Step 2: View Code in an IDE

I use [Visual Studio Code](https://code.visualstudio.com/) on macOS and Windows, but any editor can be used:

![Code layout](/images/30/code-layout.jpg)

The project demonstrates a code setup to aim for. Firstly, JavaScript code runs in the browser and is focused on a great user experience. Secondly, API code serves data to frontends. Frontend code is business focused, with less plumbing than older web back end solutions.

### Step 3: View Configuration

Both the SPA and API use configuration files that highlight important OAuth settings. The SPA acts as an **OAuth Client** and uses these configuration values:

```json
{
    "app": {
        "webOrigin":        "http://web.mycompany.com",
        "apiBaseUrl":       "http://api.mycompany.com/api"
    },
    "oauth": {
        "authority":        "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_CuhLeqiE9",
        "clientId":         "6tg0qglddpvqh74k3jbf1mmj64",
        "redirectUri":      "http://localhost/spa",
        "scope":            "openid profile"
    }
}
```

The API acts as an **OAuth Resource Server** and uses these configuration values. We will explain these settings as we progress.

```json
{
    "api": {
        "port": 80,
        "trustedOrigins": [
            "http://web.mycompany.com"
        ],
        "useProxy": false,
        "proxyUrl": "http://127.0.0.1:8888"
    },
    "oauth": {
        "jwksEndpoint": "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_CuhLeqiE9/.well-known/jwks.json",
        "algorithm": "RS256",
        "issuer": "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_qqJgVeuTn",
        "audience": ""
    }
}
```

### Step 4: Authorization Server Setup

Both the SPA and API use endpoints from my personal AWS Cognito account, which is a low cost cloud solution. Jump ahead to these future posts for further details:

- [Authorization Server Setup](https://authguidance.com/oauth-infrastructure-setup/)
- [AWS Cognito Cloud Setup](https://authguidance.com/managed-authorization-server-setup/)

OAuth clients must be registered at the authorization server, and our SPA includes an online entry as follows:

![Client settings 1](/images/30/client-settings1.jpg)

The registered OAuth settings for **Client ID**, **Redirect URI** and **Scope** allow these values to be used by applications. The same values must be used in the SPA’s own configuration.

![Client settings 2](/images/30/client-settings2.jpg)

For the first code sample we will use HTTP URLs, and Cognito requires us to register a host name of http`:`//localhost in this case. For future samples we will register HTTPS URLs instead.

This blog’s code samples are standards based, so you can change configurations to point to your own Authorization Server instead. You will then be able to use your own preferred URLs and ports for the SPA and API.

### Step 5: User Setup

This blog will use the following main Cognito test account for signing in to the SPA. This is not a real user and no personal data is used by this blog’s code samples:

- User: guestuser`@`mycompany.com
- Password: GuestPassword1

### Step 6: Domain Setup

This blog’s code samples will run on the local computer using DNS based URLs that represent a deployed architecture, and localhost based URLs will be avoided where possible. The initial code sample runs on these URLs:

- API: http`:`//api.mycompany.com/api
- SPA: http`:`//web.mycompany.com/spa

To enable this on a development computer, add these entries to your hosts file. The [OAuth Infrastructure Setup](https://authguidance.com/2019/09/15/developer-domain-setup/) post says more about the use of domnain-based URLs.

```markdown
127.0.0.1 localhost web.mycompany.com api.mycompany.com
```

### Step 7: Run the SPA and API

In the root folder, run the following script to spin up the system. This essentially just runs **npm install** and **npm start** for the SPA and API components:

```bash
./start.sh
```

The start script then triggers child scripts that run in other terminal windows, which are invoked slightly differently depending on the host computer platform:

```bash
if [ "$PLATFORM" == 'MACOS' ]; then

  open -a Terminal ./spa/start.sh
  open -a Terminal ./api/start.sh

elif [ "$PLATFORM" == 'WINDOWS' ]; then

  GIT_BASH="C:\Program Files\Git\git-bash.exe"
  "$GIT_BASH" -c ./spa/start.sh &
  "$GIT_BASH" -c ./api/start.sh &

elif [ "$PLATFORM" == 'LINUX' ]; then

  gnome-terminal -- ./spa/start.sh
  gnome-terminal -- ./api/start.sh
fi
```

The first child terminal builds the SPA’s Javascript bundles:

![Running SPA](/images/30/running-spa.jpg)

The second terminal is for the API, which listens on port 80, and requires administrator privileges for the local computer. If another component is using this port, stop that process temporarily.

![Running API](/images/30/running-api.jpg)

To keep the developer setup simple, the API also serves the SPA’s bundle files to the browser. Later in this blog we will update to a development web host, and deploy the final SPA to a Content Delivery Network.

### Step 8: Login to the SPA

The script then invokes a browser at http`:`//web.mycompany.com/spa, and the SPA triggers an OpenID Connect redirect when it loads, to get an OAuth access token, so that it can call the API:

![Login](/images/30/login.jpg)

After signing in, the SPA is rendered, which just shows hard coded fictional data returned from the API. This data is secured using OAuth access tokens, and the SPA and API code use [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), to enable cross-origin requets.

![List view](/images/20/list-view.jpg)

The first API call is to http`:`//api.mycompany.com/api/companies, and if you browse there directly you will get a 401 response, since direct browsing to APIs does not send an OAuth access token:

![API browser access](/images/30/api-browser-access.jpg)

### Step 9: Run Navigation Actions

You can navigate to the SPA’s second view by clicking one of the View Transactions links. The following type of URL can also be typed in the browser:

- http`:`//web.mycompany.com/spa/#company=1

![Company 1](/images/30/company1.jpg)

SPA URLs can be bookmarked, and this can be done by opening a new browser tab or window. If a private browser window is used, the user is redirected to sign in again, then returned to the bookmarked screen:

![Multi tab navigation](/images/30/multi-tab-navigation.jpg)

### Step 10: Run a User Session

The SPA’s session management is incomplete in the initial sample. Every time the access token expires the user has to login again. This can be simulated by clicking **Expire Token** followed by **Reload Data**.

![Session testing](/images/30/session-testing.jpg)

The code samples stores access tokens in session storage, so that page reloads do not redirect the browser. However, opening a new browser tab or window does a single sign-on operation, to get a new access token.

### Step 11: View Browser Traffic

Developers need to understand OAuth messages, which are sent using an HTTP language, with input and output parameter names defined in OAuth specifications. An OAuth authorization request begins the login process, and includes a number of query string parameters:

![HTTP debugging](/images/30/http-debugging.jpg)

### Step 12: View Security Library Logs

The SPA can show debug details from the oidc-client-ts library, to provide visualisation of the OAuth SPA logic. You can activate this by adding a **#log=debug** query parameter to the SPA, then viewing the browser console.

In the following screenshot, Google Chrome DevTools is used. Note that the Verbose level is selected in order to show debug messages, and **Preserve Log** is used, to maintain messages before and after login redirects.

![OAuth debugging](/images/30/oauth-debugging.jpg)

### Where Are We?

The initial code sample is focused on how an SPA, API and Authorization Server work together. Next we will drill into OAuth message details that developers should ensure they can visualize, both to understand and  be able to troubleshoot the security.

### Next

- Next we will look at some [SPA and API OAuth Messages](/posts/basicspa-oauthworkflow)
- For a list of all blog posts see the [Index Page](/posts/index)

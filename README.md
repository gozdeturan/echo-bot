# Facebook Messenger Echo Bot with ChatbotProxy

An echo bot to handle the authentication and webhook requests sent via facebook for new messenger bots using ChatbotProxy.

This project is developed to work with Heroku with no coding changes required. It implements the standard echo function that is provided by Facebook to provide visual feedback it is working.

This project is written in Node.js and Express to stay in line with the official Facebook docs and make it easier to use their provided examples. And this project is capable to work with/without ChatbotProxy.

## Installation

1) Create your `App` on Facebook Developers platform

2) Subcribe to page events like `messages`, `message_deliveries`, `message_reads`, `messaging_referrals`, `message_echoes`, `conversations`

3) Get a `Page Access Token(PAGE_ACCESS_TOKEN)` for a Facebook Page.

4) Subscribe to that app. (If you use correct credentials, code will automatically subscribe to that page)

5) Create a proxy using Facebook `App Credentials` on [ChatbotProxy](https://www.chatbotproxy.com/proxies/new). It will give `Proxy Url(BASE_URI)` and `Proxy Token(PROXY_TOKEN)`. Your app callback url is `https://{your_heroku_app_ _name}.herokuapp.com/messenger/webhooks`.

6) Click deploy button and set `PAGE_ACCESS_TOKEN`, `BASE_URI` and `PROXY_TOKEN`.


Hint: To see full instructions on how to enable in Facebook. [Follow the official guide](https://developers.facebook.com/docs/messenger-platform/quickstart)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Licencse

MIT

License note: This code is modified from original repo: https://github.com/culturekings/facebook-messenger-bot-webhook

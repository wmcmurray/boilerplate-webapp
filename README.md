# boilerplate-webapp

A *NodeJS* + *Mongoose* backend outputing a *VueJS* one-pager that connects to the backend with an *Hapi* REST API.

## Main technologies used

**Backend :** [NodeJS](https://nodejs.org), [Mongoose](https://github.com/Automattic/mongoose), [ExpressJS](https://github.com/expressjs/express), [Pug](https://github.com/pugjs/pug) *(formely known as Jade)*

**Frontend :** [Webpack](https://github.com/webpack/webpack), [VueJS](https://github.com/vuejs/vue), [VueX](https://github.com/vuejs/vuex), [SCSS](https://github.com/sass/sass), [gridlex](https://github.com/devlint/gridlex)

**API :** [Hapi](https://github.com/hapijs/hapi), [Boom](https://github.com/hapijs/boom), [Joi](https://github.com/hapijs/joi)

## Installation

1. Run `npm install`
2. Make sure you have MongoDB installed
3. Copy `/config/default-sample.json5` to `/config/default.json5` and change settings

## Starting the app

- `npm run build` *(do this only if you've never built frontend assets before)*
- `npm start` will start both web app and API

## Developing

- `npm run dev` will compile frontend assets in realtime
- `npm run build` will compile frontend assets for production

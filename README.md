# boilerplate-webapp

A NodeJS backend outputing a VueJS one-pager that connects to the backend with an Hapi REST API.

## Main technologies used

### Backend

- [NodeJS](https://nodejs.org)
- [Mongoose](https://github.com/Automattic/mongoose)
- [ExpressJS](https://github.com/expressjs/express)
- [Pug](https://github.com/pugjs/pug) (formely known as Jade)

### Frontend

- [Webpack](https://github.com/webpack/webpack)
- [VueJS](https://github.com/vuejs/vue)
- [VueX](https://github.com/vuejs/vuex)
- [SCSS](https://github.com/sass/sass)
- [gridlex](https://github.com/devlint/gridlex)

### API

- [Hapi](https://github.com/hapijs/hapi)
- [Boom](https://github.com/hapijs/boom)
- [Joi](https://github.com/hapijs/joi)

## Installation

1. Make a copy of `config/default-sample.json5` => `config/default.json5` and change settings.
2. Run `npm install`.

## Running the app

- API : `node api.js`
- Web app : `npm start`
- Webpack dev : `npm run dev`

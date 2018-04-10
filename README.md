![boilerplate-webapp](https://raw.githubusercontent.com/wmcmurray/boilerplate-webapp/master/logo.jpg)

## Built with

**Backend :** [NodeJS](https://nodejs.org), [ExpressJS](https://github.com/expressjs/express), [Pug](https://github.com/pugjs/pug), [Sequelize](https://github.com/sequelize/sequelize) or [Mongoose](https://github.com/Automattic/mongoose)

**Frontend :** [Webpack 2](https://github.com/webpack/webpack), [VueJS 2](https://github.com/vuejs/vue), [VueX](https://github.com/vuejs/vuex), [SCSS](https://github.com/sass/sass), [gridlex](https://github.com/devlint/gridlex)

**API :** [Hapi](https://github.com/hapijs/hapi), [Boom](https://github.com/hapijs/boom), [Joi](https://github.com/hapijs/joi)

-----

## Install

1. Make sure you have [Postgres](https://www.postgresql.org/), [MySQL](https://www.mysql.com/), [SQLite](https://www.sqlite.org/index.html) or [MongoDB](https://www.mongodb.com) installed (depending on what you want to use)
2. Run `npm install`
3. Copy `/config/default-sample.js` to `/config/default.js` and check settings
4. Run `npm run build` to compile assets for the first time

## Run

- `npm start` (or `pm2 start pm2.config.js`)

## Develop

- `npm run dev` will compile frontend assets in realtime
- `npm run build` will compile frontend assets for production

![boilerplate-webapp](https://raw.githubusercontent.com/wmcmurray/boilerplate-webapp/master/logo.jpg)

## Built with

**Database :** [Sequelize](https://github.com/sequelize/sequelize) + [Umzug](https://github.com/sequelize/umzug) (or [Mongoose](https://github.com/Automattic/mongoose))

**Backend :** [NodeJS](https://nodejs.org), [ExpressJS](https://github.com/expressjs/express), [Pug](https://github.com/pugjs/pug)

**Frontend :** [Webpack 4](https://github.com/webpack/webpack), [VueJS 2](https://github.com/vuejs/vue), [VueX](https://github.com/vuejs/vuex), [SCSS](https://github.com/sass/sass), [gridlex](https://github.com/devlint/gridlex)

**API :** [Hapi](https://github.com/hapijs/hapi), [Boom](https://github.com/hapijs/boom), [Joi](https://github.com/hapijs/joi)

-----

## Installation

### Basic (required)

1. Run `npm install && npm run build`
2. Copy `/config/default-sample.js` to `/config/default.js` and check settings

### Setup Sequelize database (optional)

1. Make sure you have [Postgres](https://www.postgresql.org/), [MySQL](https://www.mysql.com/) or [SQLite](https://www.sqlite.org/index.html) installed
2. Run `npm run init-sequelize`
3. Open `/config/base.js` and set `database_object_modeling: 'sequelize'`

### Setup Mongoose database (optional)

1. Make sure you have [MongoDB](https://www.mongodb.com) installed
2. Run `npm run init-mongoose`
3. Open `/config/base.js` and set `database_object_modeling: 'mongoose'`

-----

## Run

- `npm start` (or `pm2 start pm2.config.js`)

## Develop

- `npm run dev` will compile frontend assets in realtime
- `npm run build` will compile frontend assets for production

## Database migrations

- `npm run migrate:up` apply all pending migrations
- `npm run migrate:down` undo last migrations batch applied
- `npm run migrate:new sample` creating a new migration named "sample"

-----

## Examples

Some projects using this boilerplate in production environment :

- [www.indiegamesquest.com](http://indiegamesquest.com/)
- [www.katerinephotoartiste.com](https://katerinephotoartiste.com/)

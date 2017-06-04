const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const EVENTS = {
  USER_CREATED: 'user-created', // user {MongooseDocument}
};

module.exports = {
  events: EVENTS,
  mediator: myEmitter
};

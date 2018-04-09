const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

/**
 * Events bus to communicate stuff between parts of the application that may not be related
 *
 * List of implemented events :
 * - ...
 */
module.exports = {
  emit  : myEmitter.emit.bind(myEmitter),
  on    : myEmitter.on.bind(myEmitter),
  off   : myEmitter.removeListener.bind(myEmitter),
  once  : myEmitter.once.bind(myEmitter),
  // prepend      : myEmitter.prependListener.bind(myEmitter),
  // prependOnce  : myEmitter.prependOnceListener.bind(myEmitter),
};

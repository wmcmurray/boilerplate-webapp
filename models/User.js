var mongoose = require('mongoose');

/**
 * Represents a user
 */
var theSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
});

/**
 * Find a user from it's username
 */
theSchema.statics.findByUsername = function(username, cb) {
  return this.findOne({ username: username }, cb);
};

var theModel = mongoose.model('Viewer', theSchema);

module.exports = theModel;

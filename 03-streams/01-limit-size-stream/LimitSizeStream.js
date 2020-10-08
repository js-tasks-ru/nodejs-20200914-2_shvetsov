const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

const limit = Symbol('limit');
const length = Symbol('length');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this[limit] = options.limit;
    this[length] = 0;
  }

  _transform(chunk, encoding, callback) {
    let error = null;
    if (this[length] + chunk.length <= this[limit]) {
      this.push(chunk);
      this[length] += chunk.length;
    } else {
      error = new LimitExceededError();
    }
    callback(error);
  }
}

module.exports = LimitSizeStream;

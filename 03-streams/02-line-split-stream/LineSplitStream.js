const stream = require('stream');
const os = require('os');

const buffer = Symbol('length');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this[buffer] = '';
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString().split(os.EOL);
    for (let i = 0; i < data.length - 1; i++) {
      this.push(Buffer.from(this[buffer] + data[i]));
      this[buffer] = '';
    }
    this[buffer] += data[data.length - 1];
    callback();
  }

  _flush(callback) {
    this.push(Buffer.from(this[buffer]));
    callback();
  }
}

module.exports = LineSplitStream;

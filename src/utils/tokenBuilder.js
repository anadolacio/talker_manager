const crypto = require('crypto');

function tokenBuilder() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = tokenBuilder;
let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./production');
    break;
  case 'qa':
    config = require('./qa');
    break;
  default:
    config = require('./development');
    break;
}

module.exports = config;
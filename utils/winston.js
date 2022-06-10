const appRoot = require('app-root-path');
const winston = require('winston');

var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: `${appRoot}/logs/app.log`,
      level: 'info'
    }),
    new winston.transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: 'error'
    })
  ]
})

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;  
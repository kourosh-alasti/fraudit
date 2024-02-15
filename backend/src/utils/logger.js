const winston = require('winston')

const dateFormatter = () => {
  return new Date(Date.now()).toUTCString()
}

class Logger {
  constructor(route) {
    this.log_data = null
    this.route = route

    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${route}.log`
        })
      ],
      format: winston.format.printf((info) => {
        let msg = `${dateFormatter()} | ${info.level.toUpperCase()} | ${route}.log | ${
          info.message
        } `

        msg = info.obj ? msg + `data:${JSON.stringify(info.obj)} | ` : msg
        msg = this.log_data
          ? msg + `log_data:${JSON.stringify(this.log_data)} | `
          : msg

        return msg
      })
    })

    this.logger = logger
  }

  setLoggerData(data) {
    this.log_data = data
  }

  async info(message) {
    this.logger.log('info', message)
  }

  async info(message, obj) {
    this.logger.log('info', message, { obj })
  }

  async debug(message) {
    this.logger.log('debug', message)
  }

  async debug(message, obj) {
    this.logger.log('debug', message, { obj })
  }

  async error(message) {
    this.logger.log('error', message)
  }

  async error(message, obj) {
    this.logger.log('error', message, { obj })
  }
}

module.exports = Logger

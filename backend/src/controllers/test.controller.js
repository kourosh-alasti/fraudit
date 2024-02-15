import Logger from '../utils/logger'
const logger = new Logger('app')

export const test = (req, res) => {
  res.json({
    message: 'FraudIt API is functional!'
  })
}

export const testLogger = (req, res) => {
  const error = {}

  const body = req.body

  logger.setLoggerData(body)
  logger.info('Request received at /test', req.body)

  if (body.name === null || body.name === '') {
    logger.error('Name Field is Empty')
    error.name = 'Name Field is Empty'
  }

  if (body.age === null || body.age === '') {
    logger.error('Age Field is Empty')
    error.age = 'Age Field is Empty'
  }

  if (Object.keys(error).length !== 0) {
    logger.error('Returning Error Response', {
      success: false
    })

    res.send('ERROR')
  } else {
    logger.info('Returning Success Response', {
      success: true
    })

    res.send('No Error')
  }
}

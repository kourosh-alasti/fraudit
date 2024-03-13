const error = (code, message) => {
  const err = new Error()
  err.statusCode = code
  err.message = message

  return error
}

module.exports = error

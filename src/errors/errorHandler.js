function handleError(res, error) {
  console.error(error)
  const status = error.status || 500
  const message = error.message || 'an internal server error occurred'

  return res.status(status).json({ errors: [message] })
}

module.exports = handleError
